'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setStatus('idle');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setStatus('error');
        setError(payload.error || 'Unable to send your message right now.');
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '', website: '' });
    } catch {
      setStatus('error');
      setError('Unable to send your message right now.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="contact-name" className="block text-sm font-semibold text-stone-800">Name</label>
          <Input id="contact-name" value={form.name} onChange={(event) => updateField('name', event.target.value)} className="h-12 rounded-2xl border-stone-300 bg-white/90" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-email" className="block text-sm font-semibold text-stone-800">Email</label>
          <Input id="contact-email" type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} className="h-12 rounded-2xl border-stone-300 bg-white/90" required />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-subject" className="block text-sm font-semibold text-stone-800">Subject</label>
        <Input id="contact-subject" value={form.subject} onChange={(event) => updateField('subject', event.target.value)} className="h-12 rounded-2xl border-stone-300 bg-white/90" />
      </div>
      <div className="hidden">
        <label htmlFor="contact-website">Website</label>
        <Input id="contact-website" value={form.website} onChange={(event) => updateField('website', event.target.value)} tabIndex={-1} autoComplete="off" />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-message" className="block text-sm font-semibold text-stone-800">Message</label>
        <textarea id="contact-message" value={form.message} onChange={(event) => updateField('message', event.target.value)} rows={8} className="w-full rounded-2xl border border-stone-300 bg-white/90 px-4 py-3 text-sm text-stone-900 outline-none focus:ring-2 focus:ring-amber-700" required />
      </div>
      <Button type="submit" disabled={isSubmitting} className="h-12 rounded-2xl bg-amber-800 px-6 text-amber-50 hover:bg-amber-900">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
      {status === 'success' ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          Thank you, we&apos;ll respond within 48 hours.
        </p>
      ) : null}
      {status === 'error' && error ? (
        <p className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-medium text-orange-800">
          {error}
        </p>
      ) : null}
    </form>
  );
}
