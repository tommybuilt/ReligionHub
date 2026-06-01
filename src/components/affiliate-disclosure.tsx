import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AffiliateDisclosureProps {
  className?: string;
}

export function AffiliateDisclosure({ className }: AffiliateDisclosureProps) {
  return (
    <p className={cn('text-sm text-muted-foreground leading-relaxed', className)}>
      Links below are affiliate links. Purchases support ReligionCompare at no extra cost to you. See our{' '}
      <Link href="/legal/affiliate-disclosure" className="underline hover:text-foreground">
        affiliate disclosure
      </Link>
      .
    </p>
  );
}
