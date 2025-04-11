import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { RouterModule } from '@angular/router';
import {CheckboxModule} from 'primeng/checkbox';
import {PasswordModule} from 'primeng/password';

import { AuthService } from '../../shared/services/auth.service';
// import { singleSpaNavigate } from 'single-spa'; // opción más nativa

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    InputGroup,
    InputGroupAddon,
    RouterModule,
    ButtonModule,
    PasswordModule,
    CheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(success => {
      if (success) {
        localStorage.setItem('auth', 'true');
        console.log('success');
        // Redirección con Single-SPA
        window.history.pushState(null, '', '/menu/dashboard');
        dispatchEvent(new PopStateEvent('popstate'));
      } else {
        alert('Credenciales inválidas');
      }
    });
  }
}
