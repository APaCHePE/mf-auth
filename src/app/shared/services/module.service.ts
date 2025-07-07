// services/module.service.ts
import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, map, tap, throwError } from 'rxjs';
import { ModuleItem } from '../models/module.model';
import { HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModuleService {
  private apiService = inject(ApiService);
  private readonly STORAGE_KEY = 'options';
  // Subject para almacenar y emitir los módulos
  modulesSubject = new BehaviorSubject<ModuleItem[]>(this.getCachedModules());
  modules$ = this.modulesSubject.asObservable();

  /**
   * Carga los módulos desde el API
   * @returns Observable con la respuesta del API
   */
  loadModules(): Observable<ModuleItem[]> {
    // Obtener datos correctamente del sessionStorage
    // const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    // const userId = currentUser?.user?.idUsuario;
    // const accessToken = localStorage.getItem('accessToken');

    // if (!userId || !accessToken) {
    //   return throwError(() => new Error('No hay sesión activa'));
    // }

    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${accessToken}`,
    // });
    const options = JSON.parse(sessionStorage.getItem('options') || '[]');
    console.log('Opciones de menú 1:', options);
    console.log('Opciones de menú 2:', options.options);
    this.cacheModules(options.options);
    this.modulesSubject.next(options.options);
    return options.options;
    // return this.apiService.get<{ modules: ModuleItem[] }>(`getModulos?userId=${userId}`, headers).pipe(
    //   tap(response => {
    //     if (response.success) {
    // this.cacheModules(response.data.modules);
    // this.modulesSubject.next(response.data.modules);
    //     }
    //   }),
    //   map(response => response.data.modules)
    // );
  }

  /**
   * Obtiene los módulos activos ordenados
   * @returns Array de módulos activos
   */
  getActiveModules(): ModuleItem[] {
    return this.modulesSubject.value;
    // .sort((a, b) => a.order - b.order);
  }

  /**
   * Obtiene un módulo por su código
   * @param code Código del módulo
   * @returns Módulo encontrado o undefined
   */
  getModuleByCode(code: string): ModuleItem | undefined {
    return this.modulesSubject.value.find((module) => module.code === code);
  }
  private cacheModules(modules: ModuleItem[]): void {
    try {
      console.log('Caching modules seteo de items:', modules);
      // sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify({
      //   modules,
      //   timestamp: new Date().getTime()
      // }));
    } catch (e) {
      console.error('Error caching modules', e);
    }
  }
  private getCachedModules(): ModuleItem[] {
    const cachedData = sessionStorage.getItem(this.STORAGE_KEY);
    if (!cachedData) return [];

    try {
      // const { modules, timestamp } = JSON.parse(cachedData);
      const cachedDataParse = JSON.parse(cachedData || '[]');
      // Opcional: Validar antigüedad del cache (ej. 1 hora)
      // const isCacheValid = new Date().getTime() - timestamp < 3600000;
      // return isCacheValid ? modules : [];
      return cachedDataParse;
    } catch (e) {
      console.error('Error parsing cached modules', e);
      return [];
    }
  }
  clearCache(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
    this.modulesSubject.next([]);
  }
  updateModules(modules: ModuleItem[]): void {
    this.modulesSubject.next(modules);
  }
}