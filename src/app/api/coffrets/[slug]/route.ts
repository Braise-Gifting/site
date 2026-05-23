import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/adminAuth';

// GET /api/coffrets/:slug
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data, error } = await getSupabase()
    .from('coffrets')
    .select(`
      id, slug, nom, tagline, occasion, description, prix_min, prix_max, badge,
      items:coffret_items ( quantite, gestuelle:gestuelle_types ( id, slug, nom, format, description ) )
    `)
    .eq('slug', slug)
    .eq('actif', true)
    .single();

  if (error) return NextResponse.json({ error: 'Coffret introuvable' }, { status: 404 });
  return NextResponse.json(data);
}

// PATCH /api/coffrets/:slug (admin)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { slug } = await params;
  const body = await request.json();
  const allowed = ['actif', 'badge', 'prix_min', 'prix_max', 'ordre'];
  const update: Record<string, unknown> = {};
  allowed.forEach(k => { if (body[k] !== undefined) update[k] = body[k]; });

  if (!Object.keys(update).length) {
    return NextResponse.json({ error: 'Aucun champ valide fourni' }, { status: 400 });
  }

  const { data, error } = await getSupabase()
    .from('coffrets')
    .update(update)
    .eq('slug', slug)
    .select('id, actif, badge, prix_min, prix_max, ordre')
    .single();

  if (error) return NextResponse.json({ error: 'Coffret introuvable' }, { status: 404 });
  return NextResponse.json(data);
}
