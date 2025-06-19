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
import { AuthService } from '../../shared/services/auth.service';
import { finalize } from 'rxjs/operators';
import { LoginRequest } from '../../shared/models/auth.model';
import { ToastModule } from 'primeng/toast';
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
  private layoutService = inject(LayoutService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

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
        const userId = user?.user?.idUsuario;

        if (userId && data.access_token) {
          OptionsAPI.getUserOptions(userId, data.access_token)
            .then((response) => {
              console.log('Opciones de menú:', response.data);
              console.log('Token de acceso 1:', StorageConstants.MODULE_KEYS);
              console.log(
                'Token de acceso 2:',
                StorageConstants.MODULE_KEYS.USER_OPTIONS
              );
              
              Session.set(
                StorageConstants.MODULE_KEYS.USER_OPTIONS,
                response.data.options
              );
              console.log(
                'Token de acceso 3:',
                Session.get(StorageConstants.MODULE_KEYS.USER_OPTIONS)
              );
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Login exitoso',
              });
              window.history.pushState(
                null,
                '',
                '/comercial/consultas/dashboard'
              );
              setTimeout(() => {
                window.location.reload();
              }, 200);
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
