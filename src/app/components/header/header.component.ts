import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MegaMenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterOutlet,
    MenubarModule,
    ButtonModule,
    MegaMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  menuItems: MenuItem[] = [];
  cdr: any;

  constructor(private router: Router) {}

  model: MegaMenuItem[] = [
    {
      label: 'Módulos',
      items: [
        [
          {
            items: [
              {
                label: 'Comercial',
                icon: 'pi pi-fw pi-id-card',
                routerLink: ['productos/nuevo'],
              },
              {
                label: 'Operaciones',
                icon: 'pi pi-fw pi-check-square',
                routerLink: ['productos/modificar'],
              },
              {
                label: 'Nuevo',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: ['productos/configurar'],
              },
              {
                label: 'Sin función',
                icon: 'pi pi-fw pi-mobile',
                routerLink: ['productos/exportar'],
              },
              { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
            ],
          },
        ],
      ],
    },
  ];
  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('idTokenFirebase');
    this.router.navigate(['/']);
    location.reload();
  }
}
