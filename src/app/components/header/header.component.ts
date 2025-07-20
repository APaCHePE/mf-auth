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
    this.moduleService.modules$.subscribe((modules) => {
      this.items = this.buildMenuItems(modules);
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
    toggleMobileMenu(!currentState); // Alterna el estado
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
  private buildMenuItems(modules: any[]): MenuItem[] {
    // Función recursiva para construir los hijos
    const buildChildren = (children: any[], idModulo: any): MenuItem[] => {
      // Si no hay hijos, retorna un array vacío
      return children.map((child: any) => {
        const item: MenuItem = {
          label: child.label,
          icon: child.icon,
          ...(child.path && child.path.length > 4 && { routerLink: [child.path] }),
          ...(child.children && child.children.length > 0
            ? { items: buildChildren(child.children, idModulo) }
            : {}),
        };
        // Solo agrega command si tiene routerLink
        if (child.path && child.path.length > 4) {
          item.command = () => {
            window.dispatchEvent(
              new CustomEvent('module-selected', {
                detail: { idModulo: idModulo },
              })
            );
          };
        }
        return item;
      });
    };

    // Construir el menú principal
    return modules.map((module) => {
      const item: MenuItem = {
        label: module.label,
        icon: module.icon,
        ...(module.children && module.children.length > 0
          ? {
              items: buildChildren(
                module.children,
                module.idmodulo?.toString()
              ),
            }
          : {}),
      };
      // Si el módulo principal tiene path, también puede tener command
      if (module.path && module.path.length > 4) {
        item.routerLink = [module.path];
        item.command = () => {
          window.dispatchEvent(
            new CustomEvent('module-selected', {
              detail: { idModulo: module.idmodulo?.toString() },
            })
          );
        };
      }
      return item;
    });
  }
  // private buildMenuItems(modules: any[]) {
  //   const menuItems = modules.map((module) => {
  //     const menuItem: MegaMenuItem = {
  //       label: module.label,
  //       icon: module.icon,
  //     };
  //     // Si el módulo tiene hijos, los agrega como submenú
  //     if (module.children && module.children.length > 0) {
  //       const menuChilds: MenuItem[] = module.children.map((child: any) => ({
  //         label: child.label,
  //         routerLink: [child.path],
  //         command() {
  //           window.dispatchEvent(
  //             new CustomEvent('module-selected', {
  //               detail: {
  //                 idModulo: module.idmodulo?.toString(),
  //               },
  //             })
  //           );
  //         },
  //       }));
  //       const childBlocks = this.splitIntoBlocks(menuChilds, 10);
  //       const padresMenuChild: MenuItem[][] = childBlocks.map((block) => [
  //         {
  //           label: module.label,
  //           items: block,
  //         },
  //       ]);
  //       menuItem.items = padresMenuChild;
  //     }

  //     return menuItem;
  //   });
  //   console.log('menuItems', JSON.stringify(menuItems));
  //   return menuItems;
  // }
  private splitIntoBlocks<T>(array: T[], blockSize: number): T[][] {
    const blocks: T[][] = [];
    for (let i = 0; i < array.length; i += blockSize) {
      blocks.push(array.slice(i, i + blockSize));
    }
    return blocks;
  }
}
