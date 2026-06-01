import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ProductBadge as ProductBadgeType } from '@/lib/sacred-items';

const badgeClassNames: Record<ProductBadgeType, string> = {
  'Staff Pick': 'border-amber-300 bg-amber-100 text-amber-900',
  'Best Seller': 'border-amber-700 bg-amber-700 text-amber-50',
  'Top Rated': 'border-emerald-300 bg-emerald-100 text-emerald-900',
  New: 'border-amber-300 bg-stone-50 text-amber-900',
};

interface ProductBadgeProps {
  badge: ProductBadgeType;
  className?: string;
}

export function ProductBadge({ badge, className }: ProductBadgeProps) {
  return (
    <Badge variant="outline" className={cn('border px-2 py-0.5 text-[11px] font-semibold', badgeClassNames[badge], className)}>
      {badge}
    </Badge>
  );
}
