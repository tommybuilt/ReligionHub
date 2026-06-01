import { getRuntimeEnv } from '@/lib/db';

const encoder = new TextEncoder();

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function normalizeIp(ip: string): string {
  if (!ip) {
    return 'unknown';
  }

  const forwarded = ip.split(',')[0]?.trim();
  return forwarded || 'unknown';
}

export async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(value));
  return bytesToHex(new Uint8Array(digest));
}

export function generateHexId(byteLength = 32): string {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
}

export function safeCompare(left: string, right: string): boolean {
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  const maxLength = Math.max(leftBytes.length, rightBytes.length);
  let mismatch = leftBytes.length ^ rightBytes.length;

  for (let index = 0; index < maxLength; index += 1) {
    const leftByte = leftBytes[index] ?? 0;
    const rightByte = rightBytes[index] ?? 0;
    mismatch |= leftByte ^ rightByte;
  }

  return mismatch === 0;
}

export function getRequestIp(request: Request): string {
  const cfIp = request.headers.get('cf-connecting-ip');
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  return normalizeIp(cfIp || forwardedFor || realIp || 'unknown');
}

export async function hashIp(value: string, namespace: string): Promise<string> {
  const secret = getRuntimeEnv().SESSION_SECRET || 'religioncompare';
  return sha256Hex(`${secret}:${namespace}:${normalizeIp(value)}`);
}

export async function hashRequestIp(request: Request, namespace: string): Promise<string> {
  return hashIp(getRequestIp(request), namespace);
}

export function isoTimestamp(date = new Date()): string {
  return date.toISOString();
}

export function hourBucket(date = new Date()): string {
  return date.toISOString().slice(0, 13);
}

export function dateBucket(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export async function sleep(milliseconds: number) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}
