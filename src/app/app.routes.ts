import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout').then(m => m.Layout),
    children: [
      {
        path: '',
        loadComponent: () => import('./carousel/carousel').then(m => m.Carousel)
      },
      {
       path: 'header',
        loadComponent: () => import('./components/header/header').then(m => m.Header)
      },
      {
        path: 'about',
        loadComponent: () => import('./components/about/about').then(m => m.About)
      },
            {
        path: 'courses',
        loadComponent: () => import('./components/courses/courses').then(m => m.Courses)
      },
      {
        path: 'experience',
        loadComponent: () => import('./components/experience/experience').then(m => m.Experience)
      },
      {
        path: 'skills',
        loadComponent: () => import('./components/skills/skills').then(m => m.Skills)
      },
      {
        path: 'contact',
        loadComponent: () => import('./components/contact/contact').then(m => m.Contact)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
