import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { posts } from '../../posts/posts-data.generated';

@Component({
  selector: 'app-home',
  imports: [DatePipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly route = inject(ActivatedRoute);

  protected readonly activeTag = toSignal(
    this.route.queryParamMap.pipe(map((m) => m.get('tag'))),
    { initialValue: null as string | null },
  );

  protected readonly activeTagNormalized = computed(
    () => this.activeTag()?.trim()?.toLowerCase() ?? '',
  );

  protected readonly activeTagLabel = computed(() => {
    const slug = this.activeTagNormalized();
    if (!slug) return null as string | null;
    for (const p of posts) {
      const hit = p.tags.find((t) => t.slug === slug);
      if (hit) return hit.label;
    }
    return slug;
  });

  protected readonly filteredPosts = computed(() => {
    const raw = this.activeTagNormalized();
    if (!raw) return posts;
    return posts.filter((p) => p.tags.some((t) => t.slug === raw));
  });
}
