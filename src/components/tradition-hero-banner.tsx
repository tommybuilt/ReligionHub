import Image from 'next/image';
import { getTraditionVisual } from '@/lib/tradition-visuals';
import { cn } from '@/lib/utils';

interface TraditionHeroBannerProps {
  slug?: string;
  title: string;
  subtitle?: string;
  compact?: boolean;
  className?: string;
  priority?: boolean;
}

export function TraditionHeroBanner({
  slug,
  title,
  subtitle,
  compact = false,
  className,
  priority = false,
}: TraditionHeroBannerProps) {
  const visual = getTraditionVisual(slug);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[28px] border border-stone-200/80',
        compact ? 'h-[140px] md:h-[160px]' : 'h-[150px] md:h-[190px]',
        className
      )}
    >
      <Image
        src={visual.imageUrl}
        alt={visual.altText || `${title} hero image`}
        fill
        className="object-cover"
        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
        priority={priority}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(58,42,26,0.5)_0%,rgba(58,42,26,0.22)_42%,rgba(58,42,26,0.08)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#faf8f5] via-[rgba(250,248,245,0.72)] to-transparent" />
      <div className="absolute inset-0 flex items-end">
        <div className="w-full px-5 py-4 md:px-6 md:py-5">
          <div className={cn('mb-3 h-1.5 w-20 rounded-full', visual.accentBarClassName)} />
          <h3 className="text-2xl font-bold text-[#4c3927] md:text-[2rem]">{title}</h3>
          {subtitle ? <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#5a4630]">{subtitle}</p> : null}
        </div>
      </div>
    </div>
  );
}
