// services/options.service.ts
import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, throwError, tap, map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { SidebarOption, OptionsResponse } from '../models/option.model';

@Injectable({ providedIn: 'root' })
export class OptionsService {
  private apiService = inject(ApiService);
  private readonly STORAGE_KEY = 'cached_options';
  
  private optionsSubject = new BehaviorSubject<SidebarOption[]>([]);
  options$ = this.optionsSubject.asObservable();

  loadOptions(): Observable<SidebarOption[]> {
    const userId = JSON.parse(sessionStorage.getItem('currentUser') || '{}')?.user?.id;
    const moduleId = JSON.parse(sessionStorage.getItem('currentUser') || '{}')?.default?.idModulo;
    const sessionId = sessionStorage.getItem('sessionId');

    if (!userId || !sessionId || !moduleId) {
      return throwError(() => new Error('No hay sesión activa'));
    }

    // Verificar cache primero
    const cachedOptions = this.getCachedOptions();
    if (cachedOptions.length > 0) {
      this.optionsSubject.next(cachedOptions);
      return new Observable(observer => {
        observer.next(cachedOptions);
        observer.complete();
      });
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionId}`
    });

    return this.apiService.get<OptionsResponse>(
      `getOpciones?moduleId=${moduleId}&userId=${userId}`,
      headers
    ).pipe(
      tap(response => {
        if (response.success) {
          this.cacheOptions(response.data.options);
          this.optionsSubject.next(response.data.options);
        }
      }),
      map(response => response.data.options)
    );
  }

  private cacheOptions(options: SidebarOption[]): void {
    try {
      sessionStorage.setItem(
        `${this.STORAGE_KEY}`, 
        JSON.stringify({
          options,
          timestamp: new Date().getTime()
        })
      );
    } catch (e) {
      console.error('Error caching options', e);
    }
  }

  private getCachedOptions(): SidebarOption[] {
    const cachedData = sessionStorage.getItem(`${this.STORAGE_KEY}`);
    if (!cachedData) return [];

    try {
      const { options, timestamp } = JSON.parse(cachedData);
      const isCacheValid = new Date().getTime() - timestamp < 3600000; // 1 hora
      return isCacheValid ? options : [];
    } catch (e) {
      console.error('Error parsing cached options', e);
      return [];
    }
  }

  clearModuleCache(moduleId: string): void {
    sessionStorage.removeItem(`${this.STORAGE_KEY}`);
    this.optionsSubject.next([]);
  }
}