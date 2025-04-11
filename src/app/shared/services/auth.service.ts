import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private MOCK_USER = {
    username: 'admin',
    password: '123456',
    token: 'mock-jwt-token'
  };

  login(username: string, password: string): Observable<boolean> {
    if (username === this.MOCK_USER.username && password === this.MOCK_USER.password) {
      localStorage.setItem('token', this.MOCK_USER.token);
      localStorage.setItem('username', username);
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
