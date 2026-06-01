import Image from 'next/image';
import { redirect } from 'next/navigation';
import { AdminLoginForm } from '@/components/admin-login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAdminSession } from '@/lib/auth';

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect('/admin');
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-lg rounded-[28px] border-stone-200 bg-[#fffaf2] shadow-[0_24px_60px_rgba(58,42,26,0.12)]">
        <CardHeader className="space-y-4 pb-4 text-center">
          <div className="mx-auto flex h-16 items-center justify-center">
            <Image
              src="/religioncompare-logo.svg?v=3"
              alt="ReligionCompare"
              width={260}
              height={52}
              className="h-12 w-auto"
              priority
            />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-4xl text-stone-900">Admin Sign In</CardTitle>
            <CardDescription className="text-base leading-relaxed text-stone-600">
              Manage articles, sacred items, messages, and analytics with the same warm editorial style as the public site.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm text-amber-900">
            Sessions last 24 hours by default, or 30 days if you choose Remember me.
          </div>
          <AdminLoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
