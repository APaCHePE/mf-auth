declare module '@test/mf-utils-modules' {
  export function isSidebarMenuItemsVisible(roles: string[]): boolean;

  export function getLayoutConfig(): any;
  export function updateLayoutConfig(patch: Partial<any>): void;
  export function updateLayoutState(patch: Partial<any>): void;
  export function toggleDarkTheme(): void;
  export function toggleMobileMenu(show: boolean): void;
  export function getLayoutState(): any;
}

declare module '@prisma/mf-shared-ui' {
  import { Type } from '@angular/core';
  export const SharedButtonComponent: Type<any>;
}