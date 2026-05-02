import {
  AfterViewInit,
  Component,
  ElementRef,
  PLATFORM_ID,
  inject,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// ─── giscus configuration ────────────────────────────────────────────────
// Fill REPO_ID and CATEGORY_ID after the GitHub repo exists. Steps:
//   1. Push the project to https://github.com/tenenberg/tenenberg.github.io
//   2. Make the repo public.
//   3. Repo Settings → General → Features → check "Discussions".
//   4. Install the giscus app: https://github.com/apps/giscus
//   5. Visit https://giscus.app, fill in the form, and copy the four
//      data-* values it generates into the constants below.
const GISCUS_REPO = 'tenenberg/tenenberg.github.io';
const GISCUS_REPO_ID = '';        // e.g. 'R_kgDOXXXXXXX'
const GISCUS_CATEGORY = 'General';
const GISCUS_CATEGORY_ID = '';    // e.g. 'DIC_kwDOXXXXXXX'
// ─────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-giscus',
  template: `<div #host class="giscus-host"></div>`,
  styleUrl: './giscus.css',
})
export class Giscus implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly host = viewChild.required<ElementRef<HTMLDivElement>>('host');

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const el = this.host().nativeElement;

    if (!GISCUS_REPO_ID || !GISCUS_CATEGORY_ID) {
      el.innerHTML =
        '<p class="giscus-placeholder">' +
        'Comments will appear here once giscus is configured. ' +
        'See <code>src/app/components/giscus/giscus.ts</code> for setup steps.' +
        '</p>';
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', GISCUS_REPO);
    script.setAttribute('data-repo-id', GISCUS_REPO_ID);
    script.setAttribute('data-category', GISCUS_CATEGORY);
    script.setAttribute('data-category-id', GISCUS_CATEGORY_ID);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');
    el.appendChild(script);
  }
}
