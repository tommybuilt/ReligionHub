'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface ArticleFiltersProps {
  categories: string[];
  activeCategory?: string;
}

export function ArticleFilters({ categories, activeCategory }: ArticleFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleFilter(cat?: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat) {
      params.set('category', cat);
    } else {
      params.delete('category');
    }
    params.delete('page');
    const qs = params.toString();
    router.push(qs ? `/articles?${qs}` : '/articles');
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      <button
        onClick={() => handleFilter()}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          !activeCategory
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleFilter(cat)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeCategory === cat
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
