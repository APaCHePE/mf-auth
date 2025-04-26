import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, throwError, catchError, of, forkJoin } from 'rxjs';
import { LoginResponseData } from '../models/auth.model';
import { switchMap, tap, map, timeout } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.model';
import { ModuleService } from './module.service';
import { OptionsService } from './options.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private moduleService = inject(ModuleService);
  private optionsService = inject(OptionsService);

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  login(credentials: {
    user: string;
    password: string;
  }): Observable<ApiResponse<LoginResponseData>> {
    return this.apiService.post<LoginResponseData>('/login', credentials).pipe(
      switchMap((response) => {
        if (!response.success) {
          return throwError(() => new Error(response.message || 'Login failed'));
        }
        this.setSession(response.data);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: response.message || 'Login exitoso',
        });
        return this.loadInitialData().pipe(
          map(() => response), // Mantener la respuesta original
          timeout(5000), // Timeout de 5 segundos
          catchError(error => {
            console.error('Error loading initial data:', error);
            return of(response); // Continuar aunque falle la carga inicial
          })
        );
      }),
      tap((response) => {
        // Solo navegar después de cargar los datos o timeout
        window.history.pushState(null, '', response.data.default.defaultRoute);
      })
    );
  }

  private setSession(data: LoginResponseData): void {
    console.log('Iniciando sesión', data);
    console.log('Iniciando sesión', data.default.defaultRoute);

    sessionStorage.setItem('sessionId', data.accessToken);
    sessionStorage.setItem('currentUser', JSON.stringify(data));
    // if (data.refreshToken) {
    //   sessionStorage.setItem('refreshToken', data.refreshToken);
    // }
    this.currentUserSubject.next(data.user);
  }

  public logout(): void {
    sessionStorage.clear();
    this.moduleService.clearCache();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
  get currentUserValue(): LoginResponseData | null {
    const userData = sessionStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  get accessToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }
  private loadInitialData(): Observable<void> {
    return new Observable<void>(observer => {
      const sessionId = sessionStorage.getItem('sessionId');
      
      if (!sessionId) {
        observer.error(new Error('No hay sesión activa'));
        return;
      }
  
      // Combinar ambos observables
      forkJoin([
        this.moduleService.loadModules(),
        this.optionsService.loadOptions()
      ]).subscribe({
        next: ([modules, options]) => {
          console.log('Módulos cargados:', modules);
          console.log('Opciones cargadas:', options);
          observer.next();
          observer.complete();
        },
        error: (err) => {
          console.error('Error cargando datos iniciales:', err);
          observer.error(err);
        }
      });
    });
  }
}
