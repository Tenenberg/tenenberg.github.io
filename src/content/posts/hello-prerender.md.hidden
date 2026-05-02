---
title: Why prerender, not SSR
date: 2026-05-01
description: Notes on choosing pure SSG over a server-rendered Angular app.
tags:
  - Angular
  - SSG
---

Angular ships SSR and prerendering in the same package — and for a small
personal blog, the choice is easy.

## What prerender gets you

- **Output is static HTML.** No Node process to keep alive, no cold
  starts, no server bill.
- **GitHub Pages is enough.** Push to `main`, the Action builds, the
  CDN serves. There's nothing else to operate.
- **Hydration still works.** Angular ships the client bundle alongside
  the prerendered HTML, so navigation between posts is a fast SPA-style
  transition after the first paint.

## What you give up

You can't make per-request decisions: no auth-aware rendering, no
geo-personalization, no fresh data on first paint. For a blog, that's
fine — every reader sees the same page, and the page only changes when
I push a new commit.

## How it's wired here

`outputMode: "static"` in `angular.json` and `RenderMode.Prerender` in
`src/app/app.routes.server.ts`. The build script enumerates every post
slug ahead of time so each `/posts/<slug>` URL gets its own static HTML
file.
