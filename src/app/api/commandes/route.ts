import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/adminAuth';

function genRef() {
  return `BRS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

// POST /api/commandes — créer une commande (public)
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { client: clientData, items, adresse_livraison, message_perso, mode_paiement } = body;

  const errors: string[] = [];
  if (!clientData)                            errors.push('client requis');
  if (!clientData?.nom)                       errors.push('client.nom requis');
  if (!clientData?.prenom)                    errors.push('client.prenom requis');
  if (!clientData?.email)                     errors.push('client.email requis');
  if (!clientData?.telephone)                 errors.push('client.telephone requis');
  if (!adresse_livraison)                     errors.push('adresse_livraison requis');
  if (!Array.isArray(items) || !items.length) errors.push('items[] requis');
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });

  const supabase = getSupabase();

  const { data: client, error: clientErr } = await supabase
    .from('clients')
    .upsert({ ...clientData }, { onConflict: 'email', ignoreDuplicates: false })
    .select('id')
    .single();
  if (clientErr) return NextResponse.json({ error: clientErr.message }, { status: 500 });

  const produitIds = items.filter((i: { produit_id?: string }) => i.produit_id).map((i: { produit_id: string }) => i.produit_id);
  const prixMap: Record<string, number> = {};

  if (produitIds.length) {
    const { data: prods, error: prodsErr } = await supabase
      .from('produits').select('id, prix').in('id', produitIds).eq('actif', true);
    if (prodsErr) return NextResponse.json({ error: prodsErr.message }, { status: 500 });
    prods?.forEach((p: { id: string; prix: number }) => { prixMap[p.id] = p.prix; });
  }

  let sousTotal = 0;
  const itemsValides = items.map((item: { produit_id?: string; prix_unitaire?: number; quantite?: number }) => {
    const prix = prixMap[item.produit_id!] ?? item.prix_unitaire ?? 0;
    sousTotal += prix * (item.quantite || 1);
    return { ...item, prix_unitaire: prix };
  });

  const livraison = sousTotal >= 500 ? 0 : 50;
  const total = sousTotal + livraison;
  const ref = genRef();

  const { data: commande, error: cmdErr } = await supabase
    .from('commandes')
    .insert({
      ref, client_id: client.id, statut: 'en_attente',
      montant_sous_total: sousTotal, montant_livraison: livraison, montant_total: total,
      mode_paiement: mode_paiement || 'a_la_livraison', message_perso, adresse_livraison,
    })
    .select('id, ref').single();
  if (cmdErr) return NextResponse.json({ error: cmdErr.message }, { status: 500 });

  const lignes = itemsValides.map((item: { produit_id?: string; coffret_id?: string; ame_id?: string; quantite?: number; prix_unitaire: number; message_perso?: string }) => ({
    commande_id: commande.id,
    produit_id:    item.produit_id    || null,
    coffret_id:    item.coffret_id    || null,
    ame_id:        item.ame_id        || null,
    quantite:      item.quantite      || 1,
    prix_unitaire: item.prix_unitaire,
    message_perso: item.message_perso || null,
  }));

  const { error: lignesErr } = await supabase.from('commande_items').insert(lignes);
  if (lignesErr) return NextResponse.json({ error: lignesErr.message }, { status: 500 });

  return NextResponse.json({ ref: commande.ref, total, livraison, message: 'Commande créée avec succès' }, { status: 201 });
}

// GET /api/commandes — liste toutes les commandes (admin)
export async function GET(request: NextRequest) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { searchParams } = request.nextUrl;
  const statut = searchParams.get('statut');
  const page   = Number(searchParams.get('page') || 1);
  const limit  = Number(searchParams.get('limit') || 20);
  const from   = (page - 1) * limit;

  const supabase = getSupabase();
  let query = supabase
    .from('commandes')
    .select('id, ref, statut, montant_total, mode_paiement, created_at, client:clients ( nom, prenom, email, telephone )', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1);

  if (statut) query = query.eq('statut', statut);

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, total: count, page, limit });
}
