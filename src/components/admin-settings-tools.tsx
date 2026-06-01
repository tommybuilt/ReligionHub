'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function AdminSettingsTools() {
  const router = useRouter();

  async function runAction(url: string, confirmation: string) {
    if (!window.confirm(confirmation)) {
      return;
    }

    await fetch(url, {
      method: 'POST',
    });

    router.refresh();
  }

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="destructive"
        onClick={() => runAction('/api/admin/settings/clear-analytics', 'This will permanently delete all tracked pageviews and click events. Are you sure?')}
        className="h-12 w-full rounded-2xl"
      >
        Clear all analytics data
      </Button>
      <Button
        type="button"
        variant="destructive"
        onClick={() => runAction('/api/admin/settings/clear-messages', 'This will permanently delete all contact messages. Are you sure?')}
        className="h-12 w-full rounded-2xl"
      >
        Clear all messages
      </Button>
    </div>
  );
}
