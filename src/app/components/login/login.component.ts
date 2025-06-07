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
import { AuthAPI } from '@test/mf-utils-modules';

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

  @Output() loginSuccess = new EventEmitter<boolean>();

  credentials: LoginRequest = { user: '', password: '' };
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
    console.log('CLICK LOGIN');

    AuthAPI.login({
      username: this.credentials.user,
      password: this.credentials.password,
    })
      .then(() => {
        this.loginSuccess.emit(true);
        console.log('Login exitoso');
        
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Login exitoso',
        });
        window.history.pushState(null, '', '/comercial/consultas/dashboard');
      })
      .catch(() => {
        this.loginSuccess.emit(false);
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

