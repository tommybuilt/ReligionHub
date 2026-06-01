import { buildLogoutResponse } from '@/lib/auth';

export async function POST(request: Request) {
  return buildLogoutResponse(request);
}
