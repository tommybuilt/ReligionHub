# ReligionCompare Architecture Overview

## Overview

ReligionCompare is a content-only Next.js site for world religion profiles, comparisons, articles, quizzes, sacred places, sacred texts, holidays, and related reference pages.

The current app has no user accounts, no admin panel, no community/forum features, no payment flow, no email system, and no public backend API.

## Runtime model

1. A request hits the Cloudflare Pages proxy.
2. The proxy forwards the request to the OpenNext Cloudflare Worker SSR backend.
3. Next.js renders the page from in-repo content, components, and SEO helpers.
4. `src/middleware.ts` applies the naked-domain redirect, locale rewrite behavior, and security headers.
5. `src/app/robots.ts`, `src/app/sitemap.ts`, and `src/lib/seo.ts` generate crawl and metadata output.

## Routing and locales

- English is canonical at `/`
- Non-English locales use `/es`, `/fr`, and `/ar`
- `src/middleware.ts` rewrites non-locale paths to the default English route
- Canonical URLs, hreflang alternates, and Open Graph URLs are centralized in `src/lib/seo.ts`

## Main directories

```text
src/
├── app/
│   ├── [locale]/
│   │   ├── about/
│   │   ├── articles/
│   │   ├── beginner-guides/
│   │   ├── blog/
│   │   ├── compare/
│   │   ├── educator-resources/
│   │   ├── etiquette-guides/
│   │   ├── faqs/
│   │   ├── glossary/
│   │   ├── holidays/
│   │   ├── infographics/
│   │   ├── legal/
│   │   ├── quiz/
│   │   ├── recommended-reading/
│   │   ├── religions/
│   │   ├── sacred-places/
│   │   ├── sacred-texts/
│   │   ├── search/
│   │   └── trending/
│   ├── robots.ts
│   └── sitemap.ts
├── components/
├── lib/
│   ├── config.ts
│   ├── differences-content.ts
│   ├── phase-two-hubs.ts
│   ├── resource-details/
│   ├── search-index.ts
│   ├── seo.ts
│   └── utils.ts
├── middleware.ts
└── types/
```

## Content model

- Public pages are file-backed and rendered from local content modules
- Search suggestions and discovery data are assembled from in-repo index utilities in `src/lib/search-index.ts`
- Citation UI is rendered in the frontend through components such as `citation-drawer.tsx`

## Security and platform

- Security headers are applied in `src/middleware.ts`
- Naked-domain traffic is redirected to `www.religioncompare.com`
- The site is read-only, so there is no mutation layer to secure for accounts or admin actions

## Build and deploy

- Local app build: `npm run build`
- Worker SSR build: `npm run build:worker:ssr`
- Production deploy: `npm run deploy`
