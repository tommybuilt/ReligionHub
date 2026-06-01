import { NextResponse } from 'next/server';
import { createAdminProduct, getAdminProducts } from '@/lib/products';
import { requireApiAdminSession, unauthorizedJson } from '@/lib/auth';
import { adminProductSchema } from '@/lib/validation';

export async function GET(request: Request) {
  const session = await requireApiAdminSession(request);

  if (!session) {
    return unauthorizedJson();
  }

  const { searchParams } = new URL(request.url);
  const tradition = searchParams.get('tradition') || undefined;
  const products = await getAdminProducts(tradition);
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
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

  try {
    const product = await createAdminProduct(parsed.data);
    return NextResponse.json({ id: product.id, product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to create product.' }, { status: 500 });
  }
}
