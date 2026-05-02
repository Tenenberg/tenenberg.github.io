import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { posts } from '../../posts/posts-data.generated';
import { Giscus } from '../../components/giscus/giscus';

@Component({
  selector: 'app-post',
  imports: [DatePipe, RouterLink, Giscus],
  templateUrl: './post.html',
  styleUrl: './post.css',
  // Encapsulation off so .post-body styles reach markdown injected via [innerHTML].
  encapsulation: ViewEncapsulation.None,
})
export class PostPage {
  readonly slug = input.required<string>();

  protected readonly post = computed(() =>
    posts.find((p) => p.slug === this.slug()),
  );
}
