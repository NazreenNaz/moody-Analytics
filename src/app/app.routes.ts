import { Routes } from '@angular/router';
import { issuerDetailResolver } from './resolvers/issuer-detail.resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent)
  },
  {
    path: 'issuer/:id',
    loadComponent: () => import('./pages/issuer-detail/issuer-detail.component').then((m) => m.IssuerDetailComponent),
    resolve: {
      detail: issuerDetailResolver
    }
  },
  {
    path: 'issuer/:id/feedback',
    loadComponent: () => import('./pages/feedback-form/feedback-form.component').then((m) => m.FeedbackFormComponent),
    resolve: {
      detail: issuerDetailResolver
    }
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent)
  }
];
