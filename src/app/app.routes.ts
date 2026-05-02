import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'developer in the AI Era',
  },
  {
    path: 'posts/:slug',
    loadComponent: () => import('./pages/post/post').then((m) => m.PostPage),
  },
];
