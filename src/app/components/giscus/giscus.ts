import {
  Component,
  ElementRef,
  Injector,
  PLATFORM_ID,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// ─── giscus configuration ────────────────────────────────────────────────
// Install https://github.com/apps/giscus on this repo (lets visitors post).
// If CATEGORY_ID is empty: GitHub Actions workflow “Setup giscus” (needs secret
// REPO_ADMIN_PAT), or enable Discussions in repo Settings → General → Features,
// then run: node scripts/fetch-giscus-ids.mjs
const GISCUS_REPO = 'Tenenberg/tenenberg.github.io';
const GISCUS_REPO_ID = 'R_kgDOSSS4pA';
const GISCUS_CATEGORY = 'General';
const GISCUS_CATEGORY_ID = 'DIC_kwDOSSS4pM4C8LdQ';
// ─────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-giscus',
  template: `<div #host class="giscus-host"></div>`,
  styleUrl: './giscus.css',
})
export class Giscus {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly injector = inject(Injector);
  private readonly host = viewChild.required<ElementRef<HTMLDivElement>>('host');

  constructor() {
    // Injecting the giscus script inside ngAfterViewInit breaks under
    // provideClientHydration(withEventReplay()); afterNextRender is the
    // supported hook for browser-only DOM work after the view exists.
    afterNextRender(
      () => {
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

        el.replaceChildren();

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
        el.appendChild(script);
      },
      { injector: this.injector },
    );
  }
}
