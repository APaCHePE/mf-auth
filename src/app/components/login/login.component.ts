import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
// import { loginFirebase } from '@ventas/utils';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';
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
    CommonModule
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<boolean>();

  constructor(private messageService: MessageService) {}

  email!: string;
  password!: string;

  async login() {
    this.messageService.clear();
    try {
      sessionStorage.setItem("idTokenFirebase", "SADJNASsnajsdnajsnxjaAJSNDAJNDSAJSNjanNCjNSDJANCJADCB");

      this.messageService.add({
        severity: 'success',
        summary: 'Ingreso',
        detail: 'Usuario autenticado con éxito',
      });

      this.loginSuccess.emit(true);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            '¡Usuario no encontrado. Por favor, regístrese antes de iniciar sesión.!',
        });
      } else if (error.code === 'auth/wrong-password') {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: '¡Contraseña incorrecta. Por favor, inténtelo de nuevo.!',
        });
      } else if (error.code === 'auth/invalid-credential') {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: '¡Credenciales inválidas. Por favor, reintente.!',
        });
      } else if (error.code === 'auth/missing-password') {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: '¡Ingrese una contraseña!',
        });
      } else if (error.code === 'auth/missing-email') {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: '¡Ingrese un correo electrónico valido!',
        });
      } else if (error.code === 'auth/missing-email') {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: '¡Ingrese un correo electrónico valido!',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: '¡Se produjo un error durante la autenticación!',
        });
      }
    }
  }
}
