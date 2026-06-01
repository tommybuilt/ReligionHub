import { NextResponse } from 'next/server';
import { deleteAdminProduct, getAdminProductById, updateAdminProduct } from '@/lib/products';
import { requireApiAdminSession, unauthorizedJson } from '@/lib/auth';
import { adminProductSchema } from '@/lib/validation';

interface ProductRouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: ProductRouteProps) {
  const session = await requireApiAdminSession(request);

  if (!session) {
    return unauthorizedJson();
  }

  const { id } = await params;
  const product = await getAdminProductById(id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }

  return NextResponse.json({ product });
}

export async function PUT(request: Request, { params }: ProductRouteProps) {
  const session = await requireApiAdminSession(request);

  if (!session) {
    return unauthorizedJson();
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = adminProductSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid product data.' }, { status: 400 });
  }

  const { id } = await params;

  try {
    const product = await updateAdminProduct(id, parsed.data);
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to update product.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: ProductRouteProps) {
  const session = await requireApiAdminSession(request);

  if (!session) {
    return unauthorizedJson();
  }

  const { id } = await params;
  await deleteAdminProduct(id);
  return NextResponse.json({ ok: true });
}
