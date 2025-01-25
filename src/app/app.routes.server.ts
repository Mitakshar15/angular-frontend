import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'products/:categories',renderMode: RenderMode.Client},
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
