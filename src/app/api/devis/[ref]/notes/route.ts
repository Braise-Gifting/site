import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/adminAuth';

// PATCH /api/devis/:ref/notes (admin)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { ref } = await params;
  const { notes_internes } = await request.json();

  const { data, error } = await getSupabase()
    .from('devis')
    .update({ notes_internes })
    .eq('ref', ref.toUpperCase())
    .select('ref, notes_internes')
    .single();

  if (error) return NextResponse.json({ error: 'Devis introuvable' }, { status: 404 });
  return NextResponse.json(data);
}
