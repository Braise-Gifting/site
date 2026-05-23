import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/adminAuth';

// GET /api/clients/:id (admin)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { id } = await params;
  const { data, error } = await getSupabase()
    .from('clients')
    .select(`
      id, nom, prenom, email, telephone, adresse, ville, notes, created_at,
      commandes:commandes ( ref, statut, montant_total, created_at )
    `)
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ error: 'Client introuvable' }, { status: 404 });
  return NextResponse.json(data);
}

// PATCH /api/clients/:id/notes est géré dans [id]/notes/route.ts
