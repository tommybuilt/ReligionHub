'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { SEARCH_TYPE_LABELS } from '@/lib/search-index';
import type { SearchIndexItem } from '@/lib/search-index';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  size?: 'default' | 'lg';
  defaultValue?: string;
  overlay?: boolean;
  autoFocus?: boolean;
  onNavigate?: () => void;
  onRequestClose?: () => void;
}

export function SearchBar({
  placeholder = 'Search religions, beliefs, practices...',
  className = '',
  size = 'default',
  defaultValue = '',
  overlay = false,
  autoFocus = false,
  onNavigate,
  onRequestClose,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const [debouncedQuery, setDebouncedQuery] = useState(defaultValue);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isReady, setIsReady] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchIndexItem[]>([]);
  const containerRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const listboxId = `${inputId}-suggestions`;
  const router = useRouter();

  const searchIndexRef = useRef<((query: string, limit?: number) => SearchIndexItem[]) | null>(null);

  useEffect(() => {
    setQuery(defaultValue);
    setDebouncedQuery(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      if (document.activeElement !== inputRef.current && !showSuggestions && !overlay) {
        return;
      }

      setShowSuggestions(false);
      inputRef.current?.blur();
      if (overlay) {
        onRequestClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onRequestClose, overlay, showSuggestions]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [debouncedQuery, showSuggestions]);

  useEffect(() => {
    let cancelled = false;

    const loadSearch = async () => {
      if (searchIndexRef.current) {
        setIsReady(true);
        return;
      }

      const searchModule = await import('@/lib/search-index');
      if (cancelled) {
        return;
      }

      searchIndexRef.current = searchModule.searchIndex;
      setIsReady(true);
    };

    if (showSuggestions || debouncedQuery.trim().length >= 2 || autoFocus) {
      void loadSearch();
    }

    return () => {
      cancelled = true;
    };
  }, [autoFocus, debouncedQuery, showSuggestions]);

  useEffect(() => {
    if (!isReady || !searchIndexRef.current) {
      return;
    }

    if (debouncedQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setSuggestions(searchIndexRef.current(debouncedQuery, overlay ? 12 : 8));
  }, [debouncedQuery, isReady, overlay]);

  const showPanel = showSuggestions && query.trim().length >= 2;

  const navigateTo = (href: string) => {
    router.push(href);
    setShowSuggestions(false);
    onNavigate?.();
    if (overlay) {
      onRequestClose?.();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }

    if (activeIndex >= 0 && suggestions[activeIndex]) {
      navigateTo(suggestions[activeIndex].href);
      return;
    }

    navigateTo(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <form ref={containerRef} onSubmit={handleSubmit} className={cn('relative', className)} role="search">
      <label htmlFor={inputId} className="sr-only">Search</label>
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ${size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'}`} aria-hidden="true" />
        <Input
          id={inputId}
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' && suggestions.length > 0) {
              event.preventDefault();
              setShowSuggestions(true);
              setActiveIndex((current) => (current >= suggestions.length - 1 ? 0 : current + 1));
            }

            if (event.key === 'ArrowUp' && suggestions.length > 0) {
              event.preventDefault();
              setShowSuggestions(true);
              setActiveIndex((current) => (current <= 0 ? suggestions.length - 1 : current - 1));
            }

            if (event.key === 'Escape') {
              setShowSuggestions(false);
              if (overlay) {
                onRequestClose?.();
              }
            }
          }}
          placeholder={placeholder}
          className={`${size === 'lg' ? 'h-14 pl-12 pr-12 text-lg rounded-xl' : 'h-10 pl-10 pr-10'} ${overlay ? 'rounded-2xl' : ''}`}
          autoComplete="off"
          autoFocus={autoFocus}
          aria-expanded={showPanel}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => {
              setQuery('');
              setDebouncedQuery('');
              setShowSuggestions(false);
              setActiveIndex(-1);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {showPanel && (
        <div
          className={cn(
            'z-50 overflow-hidden border bg-background shadow-xl',
            overlay ? 'mt-3 rounded-2xl' : 'absolute left-0 right-0 mt-2 rounded-xl'
          )}
        >
          {suggestions.length > 0 ? (
            <>
              <ul id={listboxId} className="max-h-[26rem] overflow-y-auto py-2" role="listbox">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={`${suggestion.type}-${suggestion.href}`}
                    id={`${listboxId}-${index}`}
                    role="option"
                    aria-selected={activeIndex === index}
                  >
                    <button
                      type="button"
                      className={cn(
                        'w-full px-4 py-3 text-left transition-colors',
                        activeIndex === index ? 'bg-muted' : 'hover:bg-muted/70'
                      )}
                      onMouseDown={() => navigateTo(suggestion.href)}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      <div className="mb-1 flex items-start justify-between gap-3">
                        <span className="min-w-0 flex-1 break-words font-medium text-foreground">{suggestion.label}</span>
                        <Badge variant="secondary" className="shrink-0">{SEARCH_TYPE_LABELS[suggestion.type]}</Badge>
                      </div>
                      <p className="break-words text-sm text-muted-foreground">{suggestion.summary}</p>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="border-t px-4 py-3">
                <button type="submit" className="text-sm font-medium text-primary hover:underline">
                  View all results for “{query.trim()}”
                </button>
              </div>
            </>
          ) : (
            <div className="px-4 py-5">
              <p className="text-sm font-medium text-foreground">No results found</p>
              <p className="mt-1 text-sm text-muted-foreground">Try broader terms like buddhism, karma, prayer, quiz, or editorial policy.</p>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
