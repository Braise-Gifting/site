import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/adminAuth';

// GET /api/devis/:ref (admin)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { ref } = await params;
  const { data, error } = await getSupabase()
    .from('devis')
    .select('*')
    .eq('ref', ref.toUpperCase())
    .single();

  if (error) return NextResponse.json({ error: 'Devis introuvable' }, { status: 404 });
  return NextResponse.json(data);
}
