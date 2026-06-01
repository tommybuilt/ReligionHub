import { NextResponse } from 'next/server';
import { requireApiAdminSession, unauthorizedJson } from '@/lib/auth';
import { toggleAdminProductPick } from '@/lib/products';

interface ProductToggleRouteProps {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: ProductToggleRouteProps) {
  const session = await requireApiAdminSession(request);

  if (!session) {
    return unauthorizedJson();
  }

  const { id } = await params;

  try {
    const product = await toggleAdminProductPick(id);
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to update editor pick.' }, { status: 500 });
  }
}
