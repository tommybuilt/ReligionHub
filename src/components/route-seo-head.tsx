import { siteConfig } from '@/lib/config';
import { getCanonicalUrl } from '@/lib/seo';

interface RouteSeoHeadProps {
  title: string;
  description: string;
  path: string;
}

export function RouteSeoHead({ title, description, path }: RouteSeoHeadProps) {
  const canonical = getCanonicalUrl(path);
  const fullTitle = `${title} | ${siteConfig.name}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
