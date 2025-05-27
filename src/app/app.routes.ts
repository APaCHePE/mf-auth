import { Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component'; // contenedor Single-SPA
import { LoginComponent } from './components/login/login.component';
import { PublicLayoutComponent } from './layouts/public-layout.component';
import { FormCumpleanosComponent } from './pages/form-cumpleanos.component';
import { NotFoundPublicComponent } from './layouts/not-found.component'

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'public',
    component: PublicLayoutComponent,
    children: [
      { path: 'form-cumpleanos', component: FormCumpleanosComponent },
      { path: '**', redirectTo: '/public/not-found', pathMatch: 'full' },
    ],
  },
  {
    path: 'public/not-found',
    component: NotFoundPublicComponent
  },
  {
    path: '**',
    component: EmptyRouteComponent,
  },
];
