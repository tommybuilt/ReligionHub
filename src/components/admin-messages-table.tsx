'use client';

import { Fragment, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import type { AdminMessageRecord } from '@/lib/db';

interface AdminMessagesTableProps {
  messages: AdminMessageRecord[];
  initialStatus: 'all' | 'read' | 'unread';
}

export function AdminMessagesTable({ messages, initialStatus }: AdminMessagesTableProps) {
  const router = useRouter();
  const [status, setStatus] = useState<'all' | 'read' | 'unread'>(initialStatus);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredMessages = useMemo(() => {
    if (status === 'all') {
      return messages;
    }

    return messages.filter((message) => (status === 'read' ? message.is_read === 1 : message.is_read === 0));
  }, [messages, status]);

  function toggleSelected(id: string) {
    setSelectedIds((current) => (current.includes(id) ? current.filter((value) => value !== id) : [...current, id]));
  }

  async function updateRead(id: string, isRead?: boolean) {
    await fetch(`/api/admin/messages/${id}/read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isRead }),
    });
    router.refresh();
  }

  async function deleteMessage(id: string) {
    if (!window.confirm('Delete this message permanently?')) {
      return;
    }

    await fetch(`/api/admin/messages/${id}`, {
      method: 'DELETE',
    });
    router.refresh();
  }

  async function runBulk(action: 'mark-read' | 'delete') {
    if (!selectedIds.length) {
      return;
    }

    if (action === 'delete' && !window.confirm('Delete the selected messages permanently?')) {
      return;
    }

    await fetch('/api/admin/messages/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: selectedIds, action }),
    });

    setSelectedIds([]);
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {(['all', 'unread', 'read'] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setStatus(value)}
              className={status === value
                ? 'rounded-full bg-amber-800 px-4 py-2 text-sm font-semibold text-amber-50'
                : 'rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-200'}
            >
              {value === 'all' ? 'All' : value === 'unread' ? 'Unread' : 'Read'}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={() => runBulk('mark-read')} className="rounded-xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">Mark Read</Button>
          <Button type="button" variant="outline" onClick={() => runBulk('delete')} className="rounded-xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">Delete</Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-stone-200 bg-[#fffaf2] shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
            <thead className="bg-stone-50/80 font-semibold text-stone-700">
              <tr>
                <th className="px-5 py-4">
                  <input
                    type="checkbox"
                    checked={filteredMessages.length > 0 && selectedIds.length === filteredMessages.length}
                    onChange={(event) => setSelectedIds(event.target.checked ? filteredMessages.map((message) => message.id) : [])}
                  />
                </th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Subject</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white/80 text-stone-700">
              {filteredMessages.map((message) => {
                const expanded = expandedId === message.id;
                const isUnread = message.is_read === 0;

                return (
                  <Fragment key={message.id}>
                    <tr className={isUnread ? 'font-semibold text-stone-900' : ''}>
                      <td className="px-5 py-4 align-top">
                        <input type="checkbox" checked={selectedIds.includes(message.id)} onChange={() => toggleSelected(message.id)} />
                      </td>
                      <td className="px-5 py-4 align-top">{new Date(message.created_at).toLocaleString()}</td>
                      <td className="px-5 py-4 align-top">{message.name}</td>
                      <td className="px-5 py-4 align-top">{message.email}</td>
                      <td className="px-5 py-4 align-top">{message.subject || 'General inquiry'}</td>
                      <td className="px-5 py-4 align-top">
                        <span className={isUnread
                          ? 'rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800'
                          : 'rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700'}>
                          {isUnread ? 'Unread' : 'Read'}
                        </span>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <div className="flex flex-wrap gap-2">
                          <Button type="button" size="sm" variant="outline" onClick={() => setExpandedId(expanded ? null : message.id)} className="rounded-xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">{expanded ? 'Hide' : 'Open'}</Button>
                          <Button type="button" size="sm" variant="outline" onClick={() => updateRead(message.id, isUnread)} className="rounded-xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">{isUnread ? 'Mark Read' : 'Mark Unread'}</Button>
                          <Button type="button" size="sm" variant="outline" onClick={() => deleteMessage(message.id)} className="rounded-xl border-stone-300 bg-white/80 text-stone-800 hover:bg-stone-100">Delete</Button>
                        </div>
                      </td>
                    </tr>
                    {expanded ? (
                      <tr>
                        <td colSpan={7} className="px-5 pb-5">
                          <div className="rounded-[22px] border border-stone-200 bg-stone-50/80 p-4">
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-500">Message</p>
                            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-stone-700">{message.body}</p>
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
