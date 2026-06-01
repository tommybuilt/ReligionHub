# ReligionCompare

A citation-first reference site about the world's religions, built for people who want structured, sourced answers instead of forum opinions.

## What it does

ReligionCompare publishes per-religion profile pages, side-by-side comparisons, long-form articles, quizzes, and reference trees (sacred texts, sacred places, holidays, glossary, guides) for roughly two dozen traditions. The public reference content is authored as typed TypeScript modules, one file per religion or article, so every page renders from version-controlled source against a shared schema rather than free-form CMS entries. Behind the public site sits a small Cloudflare D1 back office for managing articles and products, capturing contact messages, and recording first-party page analytics.

## Tech stack

- Next.js 15 (App Router) and React 18, TypeScript in strict mode
- Cloudflare: the Next app is built for Workers with OpenNext and served behind a thin Cloudflare Pages proxy worker
- Cloudflare D1 (SQLite) for the admin, messages, and analytics tables; Cloudflare R2 as the OpenNext incremental cache
- Tailwind CSS, Radix UI primitives, lucide-react, Recharts
- Zod for input validation
- A standalone Cloudflare Worker that drafts article content with the Anthropic Messages API, and a cron Worker that refreshes an affiliate product catalog into KV

## Key features

- Citation-first content model: religion and article types carry structured `sources`, and body text uses inline numbered markers rendered into a citation drawer
- Content as typed source: each religion and article is a TypeScript module checked against a shared interface, so a missing field is a compile error rather than a runtime failure
- Comparison routes that resolve arbitrary tradition pairs into indexable pages, plus nine quiz types as real routes
- A cookie-session admin panel (articles, products, messages, analytics, settings) with constant-time password checks, httpOnly secure session cookies scoped to the admin paths, and brute-force throttling
- First-party analytics with hashed IPs and hourly de-duplication, so the project measures itself without a third-party tracker
- A full SEO and security layer: centralized metadata, sitemap and robots routes, canonical-host and legacy-path redirects, and a security-header set in middleware

## Architecture notes

- Two-layer Cloudflare topology: a Pages proxy worker handles the canonical-host redirect and forwards every request to the OpenNext SSR Worker, so Pages is only a thin front door and all rendering happens in the Worker.
- The data layer is hand-rolled prepared SQL over D1 with no ORM. Admin and analytics calls degrade gracefully: if the D1 binding is absent the public pages still render and analytics return zeros, so a database issue never takes the content site down.
- Public reference content never touches the database. It lives entirely in typed modules under the App Router tree, which keeps the read path free of database calls and makes content reviewable in pull requests.
- The article-draft Worker is bearer-token gated and emits a ready-to-paste TypeScript module that matches the content schema, so AI assists drafting without ever writing directly to production.

## Live site

https://www.religioncompare.com

## Status

This is a public snapshot of a private working repository, captured at a point in time. It reflects the real code but omits configuration, secrets, and ongoing changes that live in the private repo. Built by tommybuilt: https://tommybuilt.dev
