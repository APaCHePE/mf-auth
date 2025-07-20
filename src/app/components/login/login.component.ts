import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
// import { loginFirebase } from '@ventas/utils';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { LayoutService } from '../../shared/services/layout.service';
import { LoginRequest } from '../../shared/models/auth.model';
import { ToastModule } from 'primeng/toast';
import { ModuleService } from '../../shared/services/module.service';
import { AuthAPI, OptionsAPI, JwtUtils, Session, StorageConstants } from '@test/mf-utils-modules';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    DividerModule,
    CardModule,
    InputTextModule,
    FormsModule,
    MessagesModule,
    InputGroupModule,
    InputGroupAddon,
    CommonModule,
    ToastModule,
  ],
  providers: [MessageService, LayoutService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private messageService = inject(MessageService);
  private moduleService = inject(ModuleService);

  credentials: LoginRequest = { user: 'liam2012', password: 'ClaveSegura' };
  loading = false;

  email!: string;
  password!: string;

  login(): void {
    if (!this.credentials.user || !this.credentials.password) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validación',
        detail: 'Usuario y contraseña son requeridos',
        life: 3000,
      });
      return;
    }
    this.loading = true;
    this.messageService.clear();

    AuthAPI.login({
      username: this.credentials.user,
      password: this.credentials.password,
    })
      .then((data) => {
        const user = JwtUtils.decodeJWT(data.access_token || '');
        const { idUsuario, sedeDefault, sistemaDefault, moduloDefault } = user?.user;

        if (idUsuario && data.access_token) {
          OptionsAPI.getUserOptions(idUsuario, sistemaDefault, data.access_token)
            .then((response) => {
              const options = response.data.options;
              Session.set(StorageConstants.MODULE_KEYS.USER_OPTIONS, options);
              this.moduleService.updateModules(options);

              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Login exitoso',
              });
              // Aqui se debe agregar la logica de redirigir al dashboard default

              options.forEach((item:any) => {
                if (item.idmodulo == moduloDefault) {
                  let pathDefault = item.children[0].path;
                  item.children.forEach((subItem: any) => {
                    if (subItem.isDefault) {
                      pathDefault = subItem.path;
                    }
                  });
                  window.history.pushState(null, '', pathDefault);
                }
              });

            })
            .catch((err) => {
              console.error('Error al obtener el menú:', err);
            });
        }
      })
      .catch(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Credenciales inválidas',
          life: 3000,
        });
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
