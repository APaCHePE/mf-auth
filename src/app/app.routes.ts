import { Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component'; // contenedor Single-SPA
// import { LoginComponent } from './features/login/login.component';
// import { LayoutComponent } from './components/layout/layout.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { ExternalWrapperComponent } from './layout/external-wrapper/external-wrapper.component';

export const routes: Routes = [
  {
    path: '**',
    component: EmptyRouteComponent,
  },
];
