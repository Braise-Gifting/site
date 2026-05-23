import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/adminAuth';

// GET /api/commandes/:ref
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  const { ref } = await params;
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from('commandes')
    .select(`
      id, ref, statut, montant_sous_total, montant_livraison, montant_total,
      mode_paiement, message_perso, adresse_livraison, created_at,
      client:clients ( nom, prenom, email, telephone, ville ),
      items:commande_items (
        quantite, prix_unitaire, message_perso,
        produit:produits ( prix, ame:ames ( slug, nom ), gestuelle:gestuelle_types ( slug, nom, format ) ),
        coffret:coffrets ( slug, nom ),
        ame:ames ( slug, nom )
      )
    `)
    .eq('ref', ref.toUpperCase())
    .single();

  if (error) return NextResponse.json({ error: 'Commande introuvable' }, { status: 404 });
  return NextResponse.json(data);
}
