export interface ModuleItem {
  id: string | number;
  code: string;           // Código único del módulo
  name: string;           // Nombre para mostrar
  description?: string;   // Descripción opcional
  icon: string;           // Clase de icono (ej: 'pi pi-home')
  route: string;          // Ruta base del módulo
  order: number;          // Orden de aparición
}

export interface ModulesResponseData {
  modules: ModuleItem[];
  lastUpdated?: string;   // Fecha de última actualización
}
