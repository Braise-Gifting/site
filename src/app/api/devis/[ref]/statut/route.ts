import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/adminAuth';

const STATUTS_VALIDES = ['nouveau', 'en_cours', 'devis_envoye', 'accepte', 'refuse', 'abandonne'];

// PATCH /api/devis/:ref/statut (admin)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { ref } = await params;
  const { statut } = await request.json();

  if (!STATUTS_VALIDES.includes(statut)) {
    return NextResponse.json({ error: 'Statut invalide' }, { status: 400 });
  }

  const { data, error } = await getSupabase()
    .from('devis')
    .update({ statut })
    .eq('ref', ref.toUpperCase())
    .select('ref, statut')
    .single();

  if (error) return NextResponse.json({ error: 'Devis introuvable' }, { status: 404 });
  return NextResponse.json(data);
}
