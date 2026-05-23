import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/adminAuth';

function genRef() {
  return `DEV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

// POST /api/devis — soumission depuis le formulaire Corporate (public)
export async function POST(request: NextRequest) {
  const { entreprise, contact, resp_comm, telephone, email, unites, occasion, budget, date_livraison, message } = await request.json();

  if (!entreprise || !contact || !telephone || !email || !unites) {
    return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
  }

  const ref = genRef();
  const { data, error } = await getSupabase()
    .from('devis')
    .insert({ ref, entreprise, contact, resp_comm, telephone, email, unites, occasion, budget, date_livraison: date_livraison || null, message, statut: 'nouveau' })
    .select('ref')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ref: data.ref, message: 'Demande de devis enregistrée' }, { status: 201 });
}

// GET /api/devis (admin)
export async function GET(request: NextRequest) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { searchParams } = request.nextUrl;
  const statut = searchParams.get('statut');
  const page   = Number(searchParams.get('page') || 1);
  const limit  = Number(searchParams.get('limit') || 50);
  const from   = (page - 1) * limit;

  let query = getSupabase()
    .from('devis')
    .select('id, ref, entreprise, contact, telephone, email, unites, budget, occasion, statut, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1);

  if (statut) query = query.eq('statut', statut);

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, total: count, page, limit });
}
