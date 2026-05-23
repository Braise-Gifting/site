import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// GET /api/coffrets
export async function GET() {
  const { data, error } = await getSupabase()
    .from('coffrets')
    .select(`
      id, slug, nom, tagline, occasion, description, prix_min, prix_max, badge,
      items:coffret_items ( quantite, gestuelle:gestuelle_types ( id, slug, nom, format ) )
    `)
    .eq('actif', true)
    .order('ordre');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
