import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MegaMenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, ButtonModule, MegaMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  menuItems: MenuItem[] = [];
  cdr: any;

  // constructor(private router: Router) {}

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
                routerLink: ['comercial/consultas/dashboard'],
              },
              {
                label: 'Operaciones',
                icon: 'pi pi-fw pi-check-square',
                routerLink: ['operaciones/reclamos/dashboard'],
              },
              // {
              //   label: 'Nuevo',
              //   icon: 'pi pi-fw pi-bookmark',
              //   routerLink: ['comercial/configurar'],
              // },
              // {
              //   label: 'Sin función',
              //   icon: 'pi pi-fw pi-mobile',
              //   routerLink: ['comercial/exportar'],
              // },
              // { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
            ],
          },
        ],
      ],
    },
  ];
  ngOnInit() {}

  logout() {
    sessionStorage.removeItem('idTokenFirebase');
    window.history.pushState(null, '', '/login');
    // this.router.navigate(['/']);
    location.reload();
  }
}
