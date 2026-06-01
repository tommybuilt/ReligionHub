import type { z } from 'zod';
import { type AdminMessageRecord, dbAll, dbCount, dbFirst, dbRun, getOptionalDb } from '@/lib/db';
import { generateHexId, hashRequestIp } from '@/lib/security';
import { publicContactSchema } from '@/lib/validation';

export type PublicContactInput = z.infer<typeof publicContactSchema>;

export async function getAdminMessages(status: 'all' | 'read' | 'unread' = 'all'): Promise<AdminMessageRecord[]> {
  if (!getOptionalDb()) {
    return [];
  }

  try {
    if (status === 'read') {
      return await dbAll<AdminMessageRecord>('SELECT * FROM messages WHERE is_read = 1 ORDER BY datetime(created_at) DESC');
    }

    if (status === 'unread') {
      return await dbAll<AdminMessageRecord>('SELECT * FROM messages WHERE is_read = 0 ORDER BY datetime(created_at) DESC');
    }

    return await dbAll<AdminMessageRecord>('SELECT * FROM messages ORDER BY datetime(created_at) DESC');
  } catch {
    return [];
  }
}

export async function createMessage(input: PublicContactInput, request: Request) {
  const id = generateHexId(8);
  const ipHash = await hashRequestIp(request, 'contact');

  await dbRun(
    `INSERT INTO messages (id, name, email, subject, body, is_read, ip_hash)
     VALUES (?, ?, ?, ?, ?, 0, ?)`,
    [id, input.name, input.email, input.subject || null, input.message, ipHash]
  );

  const message = await dbFirst<AdminMessageRecord>('SELECT * FROM messages WHERE id = ?', [id]);

  if (!message) {
    throw new Error('Unable to load the saved message.');
  }

  return message;
}

export async function getMessageRateLimitCount(request: Request) {
  if (!getOptionalDb()) {
    return 0;
  }

  const ipHash = await hashRequestIp(request, 'contact');

  try {
    return await dbCount(
      `SELECT COUNT(*) as total
       FROM messages
       WHERE ip_hash = ? AND datetime(created_at) >= datetime('now', '-1 hour')`,
      [ipHash]
    );
  } catch {
    return 0;
  }
}

export async function toggleMessageRead(id: string, isRead?: boolean) {
  const current = await dbFirst<AdminMessageRecord>('SELECT * FROM messages WHERE id = ?', [id]);

  if (!current) {
    throw new Error('Message not found.');
  }

  const nextValue = typeof isRead === 'boolean' ? Number(isRead) : current.is_read ? 0 : 1;

  await dbRun('UPDATE messages SET is_read = ? WHERE id = ?', [nextValue, id]);
  return dbFirst<AdminMessageRecord>('SELECT * FROM messages WHERE id = ?', [id]);
}

export async function deleteMessage(id: string) {
  await dbRun('DELETE FROM messages WHERE id = ?', [id]);
}

export async function bulkUpdateMessages(ids: string[], action: 'mark-read' | 'delete') {
  if (!ids.length) {
    return;
  }

  const placeholders = ids.map(() => '?').join(', ');

  if (action === 'delete') {
    await dbRun(`DELETE FROM messages WHERE id IN (${placeholders})`, ids);
    return;
  }

  await dbRun(`UPDATE messages SET is_read = 1 WHERE id IN (${placeholders})`, ids);
}
