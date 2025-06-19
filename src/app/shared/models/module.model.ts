
export interface ModuleItem {
  id?: string | number;
  label: string;        // Etiqueta para mostrar
  icon: string;           // Clase de icono (ej: 'pi pi-home')
  children: ModuleItem[]; // Submódulos, si los hay
  path: string;          // Ruta base del módulo

  code?: string;           // Código único del módulo
  name?: string;           // Nombre para mostrar
  description?: string;   // Descripción opcional
  order?: number;          // Orden de aparición
}

export interface ModulesResponseData {
  modules: ModuleItem[];
  lastUpdated?: string;   // Fecha de última actualización
}
