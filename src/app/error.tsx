'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] text-center py-16">
      <AlertTriangle className="h-16 w-16 text-destructive mb-4" aria-hidden="true" />
      <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        An unexpected error occurred. Please try again or return to the home page. If the problem persists, contact support.
      </p>
      {error.digest && (
        <p className="text-xs text-muted-foreground mb-4 font-mono">Error ID: {error.digest}</p>
      )}
      <div className="flex gap-3">
        <Button onClick={reset} className="gap-2">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try Again
        </Button>
        <Button variant="outline" asChild>
          <Link href="/" className="gap-2">
            <Home className="h-4 w-4" aria-hidden="true" />
            Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
