import { NextRequest } from 'next/server';

export function isAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : request.nextUrl.searchParams.get('token') || '';
  return !!token && token === process.env.ADMIN_TOKEN;
}
