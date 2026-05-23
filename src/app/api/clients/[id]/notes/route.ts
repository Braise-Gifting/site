import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/adminAuth';

// PATCH /api/clients/:id/notes (admin)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { id } = await params;
  const { notes } = await request.json();

  const { data, error } = await getSupabase()
    .from('clients')
    .update({ notes })
    .eq('id', id)
    .select('id, notes')
    .single();

  if (error) return NextResponse.json({ error: 'Client introuvable' }, { status: 404 });
  return NextResponse.json(data);
}
