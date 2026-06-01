'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginResponsePayload {
  error?: string;
  redirectTo?: string;
}

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, rememberMe }),
      });

      const payload = (await response.json().catch(() => ({}))) as LoginResponsePayload;

      if (!response.ok) {
        setError(payload.error || 'Invalid credentials');
        return;
      }

      router.push(payload.redirectTo || '/admin');
      router.refresh();
    } catch {
      setError('Unable to sign in right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="admin-password" className="block text-sm font-semibold text-stone-800">
          Password
        </label>
        <Input
          id="admin-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
          className="h-12 rounded-2xl border-stone-300 bg-white/90 text-stone-900 focus-visible:ring-amber-700"
        />
      </div>

      <label className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50/80 px-4 py-3 text-sm text-stone-700">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
          className="h-4 w-4 rounded border-stone-300 text-amber-700 focus:ring-amber-700"
        />
        Remember me for 30 days
      </label>

      {error ? (
        <div className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-medium text-orange-800">
          {error}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 flex-1 rounded-2xl bg-amber-800 text-amber-50 hover:bg-amber-900"
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </div>
    </form>
  );
}
