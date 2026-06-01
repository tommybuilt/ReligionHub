import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] text-center py-16">
      <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Try searching or return to the home page.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/" className="gap-2">
            <Home className="h-4 w-4" aria-hidden="true" />
            Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/religions" className="gap-2">
            <Search className="h-4 w-4" aria-hidden="true" />
            Browse Religions
          </Link>
        </Button>
      </div>
    </div>
  );
}
