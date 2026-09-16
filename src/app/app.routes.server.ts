import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'eventos/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'curso/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'video/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'inscripcion/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
