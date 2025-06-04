import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { MenuItem } from 'primeng/api';
import { MegaMenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../../shared/services/layout.service';
import { ModuleService } from '../../shared/services/module.service';
import { ModuleItem } from 'src/app/shared/models/module.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { toggleMobileMenu, getLayoutState } from '@test/mf-utils-modules';
import { SettingComponent } from './components/setting.component';


@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    MegaMenuModule,
    StyleClassModule,
    SettingComponent,
  ],
  providers: [LayoutService],
  templateUrl: './header.component.html',
  host: {
    class: 'layout-topbar',
  },
  styles: `
      :host ::ng-deep .p-overlaybadge .p-badge {
          outline-width: 0px;
      }
  `,
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  menuItems: MegaMenuItem[] = [];
  cdr: any;
  showSettings = false;

  constructor(
    private layoutService: LayoutService,
    private moduleService: ModuleService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.layoutService.update((cfg) => ({ ...cfg, darkTheme: false }));
  }
  ngOnInit() {
    this.menuItems = this.buildMenuItems(
      this.moduleService.modulesSubject.value
    );

    // Suscribirse a futuros cambios
    this.moduleService.modules$.subscribe((modules) => {
      this.menuItems = this.buildMenuItems(modules);
    });
    if (
      this.authService.currentUserValue &&
      this.moduleService.modulesSubject.value.length === 0
    ) {
      this.moduleService.loadModules().subscribe({
        error: (err) =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error cargando módulos',
          }),
      });
    }
  }

  toggleSettings() {
    this.showSettings = !this.showSettings;
  }
  toggleSidebar(): void {
    const currentState = getLayoutState().staticMenuMobileActive;
    toggleMobileMenu(!currentState); // alterna el estado
  }
  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }
  logout() {
    this.authService.logout();
    this.messageService.add({
      severity: 'success',
      summary: 'Sesión cerrada',
      detail: 'Has cerrado sesión correctamente',
      life: 3000,
    });
  }
  private buildMenuItems(modules: ModuleItem[]): MegaMenuItem[] {
    return [
      {
        label: 'Móduloss',
        items: [
          [
            {
              items: modules.map((module) => ({
                label: module.name,
                icon: module.icon,
                routerLink: [module.route],
              })),
            },
          ],
        ],
      },
    ];
  }
}
