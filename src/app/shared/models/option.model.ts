// models/option.model.ts
export interface SidebarOption {
  icon: string;
  label: string;
  path?: string;
  expanded?: boolean;
  children?: SidebarOption[];
  permissions?: string[]; // Opcional: para control de acceso
}

export interface OptionsResponse {
  options: SidebarOption[];
}

export interface ModuleOptionsResponseData {
  moduleId: string;
  moduleName: string;
  options: SidebarOption[];
  lastUpdated?: string;
}