import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// GET /api/produits/gestuelle/:slug?ame=layl
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const ame = request.nextUrl.searchParams.get('ame');

  let query = getSupabase()
    .from('produits')
    .select(`
      id, prix, stock, badge,
      ame:ames ( id, slug, nom, sous_titre, couleur_hex ),
      gestuelle:gestuelle_types ( id, slug, nom, format )
    `)
    .eq('gestuelle_types.slug', slug)
    .eq('actif', true);

  if (ame) query = query.eq('ames.slug', ame);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
