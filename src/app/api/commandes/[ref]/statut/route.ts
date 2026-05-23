import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/adminAuth';

const STATUTS_VALIDES = ['en_attente', 'confirmee', 'en_preparation', 'expediee', 'livree', 'annulee'];

// PATCH /api/commandes/:ref/statut (admin)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { ref } = await params;
  const { statut } = await request.json();

  if (!STATUTS_VALIDES.includes(statut)) {
    return NextResponse.json({ error: `Statut invalide. Valeurs acceptées : ${STATUTS_VALIDES.join(', ')}` }, { status: 400 });
  }

  const { data, error } = await getSupabase()
    .from('commandes')
    .update({ statut })
    .eq('ref', ref.toUpperCase())
    .select('ref, statut')
    .single();

  if (error) return NextResponse.json({ error: 'Commande introuvable' }, { status: 404 });
  return NextResponse.json(data);
}
