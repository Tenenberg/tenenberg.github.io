import { RenderMode, ServerRoute } from '@angular/ssr';
import { posts } from './posts/posts-data.generated';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'posts/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => posts.map((p) => ({ slug: p.slug })),
  },
];
