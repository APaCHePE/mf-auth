import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
// import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
// import { LoginComponent } from './features/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgIf, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  userAutenticado: boolean = false;

  updateUserStatus(authenticated: boolean) {
    this.userAutenticado = authenticated;

    this.cdr.detectChanges();
  }

  title = 'layout';

  async ngOnInit(): Promise<void> {
    if (isAuthenticated()) {
      this.userAutenticado = true;
    } else {
      this.userAutenticado = false;
    }
  }
}

export const isAuthenticated = (): boolean => {
  return !!sessionStorage.getItem("idTokenFirebase");
};