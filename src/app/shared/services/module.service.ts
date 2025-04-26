// services/module.service.ts
import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, map, tap, throwError } from 'rxjs';
import { ModuleItem } from '../models/module.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ModuleService {
  private apiService = inject(ApiService);
  private readonly STORAGE_KEY = 'cached_modules';
  
  // Subject para almacenar y emitir los módulos
  modulesSubject = new BehaviorSubject<ModuleItem[]>(this.getCachedModules());
  modules$ = this.modulesSubject.asObservable();

  /**
   * Carga los módulos desde el API
   * @returns Observable con la respuesta del API
   */
  loadModules(): Observable<ModuleItem[]> {
    // Obtener datos correctamente del sessionStorage
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    const userId = currentUser?.user?.id;
    const sessionId = sessionStorage.getItem('sessionId');
  
    if (!userId || !sessionId) {
      return throwError(() => new Error('No hay sesión activa'));
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionId}`
    });
  
    return this.apiService.get<{ modules: ModuleItem[] }>(`getModulos?userId=${userId}`, headers).pipe(
      tap(response => {
        if (response.success) {
          this.cacheModules(response.data.modules);
          this.modulesSubject.next(response.data.modules);
        }
      }),
      map(response => response.data.modules)
    );
  }

  /**
   * Obtiene los módulos activos ordenados
   * @returns Array de módulos activos
   */
  getActiveModules(): ModuleItem[] {
    return this.modulesSubject.value
      .sort((a, b) => a.order - b.order);
  }

  /**
   * Obtiene un módulo por su código
   * @param code Código del módulo
   * @returns Módulo encontrado o undefined
   */
  getModuleByCode(code: string): ModuleItem | undefined {
    return this.modulesSubject.value.find(module => module.code === code);
  }
  private cacheModules(modules: ModuleItem[]): void {
    try {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify({
        modules,
        timestamp: new Date().getTime()
      }));
    } catch (e) {
      console.error('Error caching modules', e);
    }
  }
  private getCachedModules(): ModuleItem[] {
    const cachedData = sessionStorage.getItem(this.STORAGE_KEY);
    if (!cachedData) return [];

    try {
      const { modules, timestamp } = JSON.parse(cachedData);
      // Opcional: Validar antigüedad del cache (ej. 1 hora)
      const isCacheValid = new Date().getTime() - timestamp < 3600000;
      return isCacheValid ? modules : [];
    } catch (e) {
      console.error('Error parsing cached modules', e);
      return [];
    }
  }
  clearCache(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
    this.modulesSubject.next([]);
  }
}