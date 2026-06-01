# ReligionCompare

A citation-backed reference site for the world's religions, written for people
who want straight answers grounded in named sources rather than a forum.

> Curated portfolio snapshot. This is a public snapshot of a real project built
> and operated by TPS Worldwide LLC. Active development happens in a private
> repository.

## Overview

ReligionCompare publishes profiles for 25 traditions and 27 long-form articles,
plus side-by-side comparisons, sacred-text and sacred-place references,
holidays, quizzes, glossary entries, etiquette guides, educator resources, and
beginner guides. Every claim that needs sourcing carries a numbered footnote
tied to a citation visible to the reader. The site is content-only: no
accounts, no community, no payments, no public API.

## Features

- **25 religion profiles** under `/religions/[slug]`, covering Christianity,
  Islam, Hinduism, Buddhism, Judaism, Sikhism, Bahai, Jainism, Confucianism,
  Shinto, Rastafari, Druze, Paganism, Indigenous traditions, Secular humanism,
  and major Christian branches (Catholicism, Orthodoxy, Protestantism, Latter
  Day Saints, Jehovah's Witnesses), among others.
- **Side-by-side comparisons** at `/compare/[...slugs]`, with a multi-segment
  catch-all route so any pair of traditions resolves to a real, indexable
  comparison page.
- **27 articles** at `/articles/[slug]`, each typed against a shared `Article`
  schema with author, publish date, related religions, related comparisons,
  and inline numbered citations.
- **Reference content trees**: sacred texts, sacred places, sacred items,
  holidays (with a calendar UI), and recommended reading, each routed per
  slug with structured metadata.
- **Quizzes**: alignment, demographics, ethics, history, knowledge, sacred
  places, symbols, traditions, and a "what religion am I" assessment, all
  routed under `/quiz/...`.
- **Localization scaffolding**: middleware rewrites at the request edge so
  English is canonical at `/`, with locale rewrites for `/es`, `/fr`, and
  `/ar`. Hreflang alternates and canonical URLs are emitted centrally.

## Stack

- **Framework**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Radix UI primitives
- **Icons**: Lucide
- **Charts**: Recharts (used in demographic and history sections)
- **Hosting**: Cloudflare Pages proxy in front of an OpenNext Cloudflare
  Worker that runs the Next.js SSR runtime
- **Content store**: typed TypeScript modules under
  `src/app/religions/[slug]/content/` and `src/app/articles/content/`. There
  is no CMS and no database in the public-facing site.

## Architecture notes

- **Content is typed source, not a database**. Every religion and article is a
  TypeScript module that exports a typed object matching a shared schema. This
  makes the build deterministic, makes pull-request review of content changes
  easy, and removes a whole class of runtime errors (a missing field is a
  build error, not a 500).
- **Citation-first writing**. Every article tracks a numbered citation list,
  and the article body references those numbers inline. The schema makes a
  citation an entity, not free-form text, so the site can render a footnotes
  block, a sources list, and a "verify this claim" affordance from the same
  data.
- **Runtime model documented**. `ARCHITECTURE.md` walks through the request
  flow: Cloudflare Pages proxy, OpenNext Cloudflare Worker SSR, in-repo
  content rendering, middleware-applied security headers and canonical-host
  redirect, and centralized SEO helpers in `src/lib/seo.ts`.
- **No user surface to harden**. The deliberate absence of accounts, forms,
  comments, and forms-of-engagement keeps the attack surface very small.
  The only writes from a visitor are anonymous analytics events behind a
  `/api/track` endpoint.

## License

MIT. See [LICENSE](LICENSE).
