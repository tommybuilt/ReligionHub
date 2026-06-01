import { AdminMessagesTable } from '@/components/admin-messages-table';
import { getAdminMessages } from '@/lib/messages';

export const dynamic = 'force-dynamic';

interface AdminMessagesPageProps {
  searchParams: Promise<{ status?: 'all' | 'read' | 'unread' }>;
}

export default async function AdminMessagesPage({ searchParams }: AdminMessagesPageProps) {
  const { status } = await searchParams;
  const activeStatus = status === 'read' || status === 'unread' ? status : 'all';
  const messages = await getAdminMessages(activeStatus);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Inbox</p>
        <h1 className="text-4xl text-stone-900">Messages</h1>
        <p className="mt-2 max-w-3xl text-base leading-relaxed text-stone-600">
          Review contact submissions, mark items as read, and remove spam or resolved messages.
        </p>
      </div>

      <AdminMessagesTable messages={messages} initialStatus={activeStatus} />
    </div>
  );
}
