import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/adminAuth';

// GET /api/produits/:id
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await getSupabase()
    .from('produits')
    .select(`
      id, prix, stock, badge,
      ame:ames ( id, slug, nom, sous_titre, description, notes, couleur_hex ),
      gestuelle:gestuelle_types ( id, slug, nom, format, description )
    `)
    .eq('id', id)
    .eq('actif', true)
    .single();

  if (error) return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 });
  return NextResponse.json(data);
}

// PATCH /api/produits/:id (admin)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const allowed = ['prix', 'stock', 'actif', 'badge'];
  const update: Record<string, unknown> = {};
  allowed.forEach(k => { if (body[k] !== undefined) update[k] = body[k]; });

  if (!Object.keys(update).length) {
    return NextResponse.json({ error: 'Aucun champ valide fourni' }, { status: 400 });
  }

  const { data, error } = await getSupabase()
    .from('produits')
    .update(update)
    .eq('id', id)
    .select('id, prix, stock, actif, badge')
    .single();

  if (error) return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 });
  return NextResponse.json(data);
}
