import { AdminShell } from '@/components/admin-shell';
import { getAdminSidebarCounts } from '@/lib/admin-data';
import { requireAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminSession();
  const counts = await getAdminSidebarCounts();

  return <AdminShell counts={counts}>{children}</AdminShell>;
}
