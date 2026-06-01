import Link from 'next/link';
import { AdminSettingsTools } from '@/components/admin-settings-tools';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAdminDashboardStats } from '@/lib/admin-data';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const stats = await getAdminDashboardStats();

  return (
    <div className="space-y-6">
      <Card className="rounded-[24px] border-stone-200 bg-[#fffaf2] shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
        <CardHeader>
          <CardTitle className="text-4xl text-stone-900">Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-stone-700">
          <p><strong>Site URL:</strong> https://www.religioncompare.com</p>
          <p><strong>Articles:</strong> {stats.publishedArticles} published, {stats.draftArticles} drafts</p>
          <p><strong>Products:</strong> {stats.totalProducts}</p>
          <p><strong>Messages:</strong> {stats.totalMessages}, {stats.unreadMessages} unread</p>
          <p><strong>Tracked pageviews, last 30 days:</strong> {stats.pageviewsLast30Days}</p>
          <p><strong>Total tracked events:</strong> {stats.totalEvents}</p>
          <p>
            Use <a className="font-medium text-amber-800 underline underline-offset-4" href="/hash-tool.html" target="_blank" rel="noreferrer">/hash-tool.html</a> to create a new admin password hash.
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-[24px] border-stone-200 bg-[#fffaf2] shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
        <CardHeader>
          <CardTitle className="text-3xl text-stone-900">Admin Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed text-stone-700">
          <p>To change your admin password:</p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Open the <Link href="/hash-tool.html" target="_blank" className="font-medium text-amber-800 underline underline-offset-4">hash tool</Link>.</li>
            <li>Enter your new password.</li>
            <li>Copy the generated hash.</li>
            <li>Go to Cloudflare dashboard, Workers, religionhub, Settings, Variables.</li>
            <li>Update <code>ADMIN_PASSWORD_HASH</code> with the new hash.</li>
          </ol>
        </CardContent>
      </Card>

      <Card className="rounded-[24px] border-red-200 bg-[#fffaf2] shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
        <CardHeader>
          <CardTitle className="text-3xl text-stone-900">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminSettingsTools />
        </CardContent>
      </Card>
    </div>
  );
}
