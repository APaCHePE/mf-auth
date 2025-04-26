import { computed, Injectable, signal, Signal } from '@angular/core';

export interface LayoutConfig {
  primary: string | null;
  surface: string | null;
  darkTheme: boolean;
  menuTheme: string;
  menuMode: string;
  topbarTheme: string;
  menuProfilePosition: string;
}

@Injectable({ providedIn: 'root' })
export class LayoutService {
  
  isOverlay: Signal<boolean> = computed(() => this.layoutConfig().menuMode === 'overlay');
  
  private _config = signal<LayoutConfig>({
    primary: 'indigo',
    surface: null,
    darkTheme: false,
    menuTheme: 'light',
    menuMode: 'static',
    topbarTheme: 'indigo',
    menuProfilePosition: 'end',
  });

  layoutConfig = this._config.asReadonly();

  update(callback: (cfg: LayoutConfig) => LayoutConfig) {
    this._config.update(callback);
  }
  onMenuToggle() {
    if (this.isOverlay()) {
      // this.layoutState.update(...);
      // ...
    }
    if (this.isDesktop()) {
      // this.layoutState.update(...);
    } else {
      // ...
    }
  }
  isDesktop() {
      return window.innerWidth > 991;
  }

  isMobile() {
      return !this.isDesktop();
  }
}
