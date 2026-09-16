import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'portal',
    pathMatch: 'full'
  },
  {
    path: 'portal',
    loadComponent: () => import('./features/portal/pages/portal-page/portal-page.component').then(m => m.PortalPage)
  },
  {
    path: 'formacion-continua',
    loadComponent: () => import('./features/portal/pages/continua-videos-page/continua-videos-page.component').then(m => m.ContinuaVideosPageComponent)
  },
  {
    path: 'aula-virtual',
    loadComponent: () => import('./features/portal/pages/virtual-classroom-page/virtual-classroom-page.component').then(m => m.VirtualClassroomPageComponent)
  },
  {
    path: 'pastillas-sidano',
    loadComponent: () => import('./features/portal/pages/sidano-pills-page/sidano-pills-page.component').then(m => m.SidanoPillsPageComponent)
  },
  {
    path: 'habilidades-tecnologicas',
    loadComponent: () => import('./features/portal/pages/tech-skills-page/tech-skills-page.component').then(m => m.TechSkillsPageComponent)
  },
  {
    path: 'eventos',
    loadComponent: () => import('./features/events/pages/events-list-page/events-list-page.component').then(m => m.EventsListPage)
  },
  {
    path: 'eventos/:slug',
    loadComponent: () => import('./features/events/pages/event-detail-page/event-detail-page.component').then(m => m.EventDetailPage)
  },
  {
    path: 'curso/:slug',
    loadComponent: () => import('./features/portal/pages/course-detail-page/course-detail-page').then(m => m.CourseDetailPage)
  },
  {
    path: 'video/:slug',
    loadComponent: () => import('./features/portal/pages/video-detail-page/video-detail-page').then(m => m.VideoDetailPage)
  },
  {
    path: 'inscripcion/:slug',
    loadComponent: () => import('./features/portal/pages/enrollment-page/enrollment-page').then(m => m.EnrollmentPage)
  },
  {
    path: '**',
    redirectTo: 'portal'
  }
];

