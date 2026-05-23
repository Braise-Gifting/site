import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/adminAuth';

// GET /api/clients (admin)
export async function GET(request: NextRequest) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { searchParams } = request.nextUrl;
  const search = searchParams.get('search');
  const page   = Number(searchParams.get('page') || 1);
  const limit  = Number(searchParams.get('limit') || 20);
  const from   = (page - 1) * limit;

  let query = getSupabase()
    .from('clients')
    .select('id, nom, prenom, email, telephone, ville, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1);

  if (search) {
    query = query.or(`nom.ilike.%${search}%,prenom.ilike.%${search}%,email.ilike.%${search}%`);
  }

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, total: count, page, limit });
}
