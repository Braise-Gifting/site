import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// GET /api/produits
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const ame      = searchParams.get('ame');
  const gestuelle = searchParams.get('gestuelle');

  let query = getSupabase()
    .from('produits')
    .select(`
      id, prix, stock, actif, badge,
      ame:ames ( id, slug, nom, sous_titre, couleur_hex ),
      gestuelle:gestuelle_types ( id, slug, nom, format )
    `)
    .eq('actif', true)
    .order('prix');

  if (ame)       query = query.eq('ames.slug', ame);
  if (gestuelle) query = query.eq('gestuelle_types.slug', gestuelle);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
