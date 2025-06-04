import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';
import { navigateToUrl } from 'single-spa';
import { AuthService } from './shared/services/auth.service';
import { ModuleService } from './shared/services/module.service';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgIf, Toast],
  template: `
    <app-topbar *ngIf="showHeader"></app-topbar>
    <router-outlet></router-outlet>
    <p-toast />
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showHeader = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private moduleService: ModuleService
  ) {}
  ngOnInit(): void {
    this.controlAcceso(window.location.pathname);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.controlAcceso(window.location.pathname);
      });
  }

  controlAcceso(url: string): void {
    const isLogged = this.isAuthenticated();
    const esRutaPrivada = this.isRutaPrivada(url);

    this.showHeader = isLogged && esRutaPrivada;
    if (isLogged && esRutaPrivada) {
      // Cargar módulos si no hay ninguno cargado
      if (this.moduleService.modulesSubject.value.length === 0) {
        this.moduleService.loadModules().subscribe();
      }
    }
    if (!isLogged && esRutaPrivada) {
      console.log('[MF-AUTH] Usuario no autenticado. Redirigiendo a /login');
      navigateToUrl('/login');
    }
  }

  private isRutaPrivada(url: string): boolean {
    return (
      url.startsWith('/comercial/') ||
      url.startsWith('/operaciones/') ||
      url.startsWith('/seguridad/')
    );
  }
  private isAuthenticated = (): boolean => {
    return !!sessionStorage.getItem('sessionId');
  };
}
