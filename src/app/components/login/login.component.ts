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
    
    this.authService
      .login(this.credentials)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.loginSuccess.emit(true),
        error: () => this.loginSuccess.emit(false),
      });
  }
}

