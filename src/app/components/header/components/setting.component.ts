import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  NgZone,
  computed,
  booleanAttribute,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PrimeNG } from 'primeng/config';
import { updatePreset } from '@primeng/themes';
import Material from '@primeng/themes/material';


import {
  layoutOptionFlags,
  surfaces,
  themeOptions,
  menuModes,
  menuThemes,
  topbarThemes,
  getLayoutConfig,
  updateLayoutConfig,
  updateLayoutState,
  applySurfacePalette,
  defaultLayoutConfig,
  surfaceOptions,
} from '@test/mf-utils-modules';

const presets = {
  Material,
} as const;

declare type KeyOfType<T> = keyof T extends infer U ? U : never;
declare type SurfacesType = {
  name?: string;
  palette?: {
    0?: string;
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    950?: string;
  };
};

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    SelectButtonModule,
    RadioButtonModule,
    TooltipModule,
    ToggleButtonModule,
  ],
  templateUrl: './setting.component.html',
})
export class SettingComponent {
  // 1. Inyecciones y dependencias
  @Input({ transform: booleanAttribute }) simple: boolean = false;
  cd = inject(ChangeDetectorRef);
  config: PrimeNG = inject(PrimeNG);
  zone = inject(NgZone);
  primeng = inject(PrimeNG);

  // 2. Configuración general
  themeOptions = themeOptions;
  menuModes = menuModes;
  menuThemes = menuThemes;
  topbarThemes = topbarThemes;
  surfaces: SurfacesType[] = surfaceOptions;
  defaults = defaultLayoutConfig;
  visibility = layoutOptionFlags;

  private _visible = false;

  // 3. Propiedades derivadas
  isDarkTheme = computed(() => getLayoutConfig().darkTheme);
  selectedPrimaryColor = computed(() => getLayoutConfig().primary);
  selectedSurface = () => getLayoutConfig().surface;
  primaryColors = computed<SurfacesType[]>(() => {
    const presetPalette = Material.primitive;
    const colors = [
      'emerald',
      'green',
      'lime',
      'orange',
      'amber',
      'yellow',
      'teal',
      'cyan',
      'sky',
      'blue',
      'indigo',
      'violet',
      'purple',
      'fuchsia',
      'pink',
      'rose',
    ];
    const palettes: SurfacesType[] = [{ name: 'noir', palette: {} }];
    colors.forEach((color) => {
      palettes.push({
        name: color,
        palette: presetPalette?.[
          color as KeyOfType<typeof presetPalette>
        ] as SurfacesType['palette'],
      });
    });
    return palettes;
  });

  // 4. Getters y setters para configuración
  get menuMode() {
    return getLayoutConfig().menuMode;
  }
  set menuMode(val: string) {
    updateLayoutConfig({ menuMode: val });
  }
  get menuTheme(): string {
    return getLayoutConfig().menuTheme;
  }
  set menuTheme(val: string) {
    updateLayoutConfig({ menuTheme: val });
  }
  get topbarTheme(): string {
    return getLayoutConfig().topbarTheme;
  }
  set topbarTheme(val: string) {
    updateLayoutConfig({ topbarTheme: val });
  }
  get darkTheme(): boolean {
    return getLayoutConfig().darkTheme;
  }
  set darkTheme(_val: boolean) {
    updateLayoutConfig({
      menuTheme: _val ? 'dark' : 'light',
      darkTheme: _val,
    });
  }

  @Input()
  get visible() {
    return this._visible;
  }
  set visible(val: boolean) {
    this._visible = val;
  }

  get isDark() {
    return getLayoutConfig().darkTheme;
  }

  @Output() closed = new EventEmitter<void>();

  // 5. Métodos
  applyTheme(type: string, color: any) {
    if (type === 'primary') {
      updatePreset(this.getPresetExt());
    } else if (type === 'surface') {
      applySurfacePalette(color.palette);
    }
  }
  onLayoutThemeChange(theme: string) {
    updateLayoutConfig({ layoutTheme: theme });
  }

  getPresetExt() {
    const color: SurfacesType =
      this.primaryColors().find(
        (c) => c.name === this.selectedPrimaryColor()
      ) || {};
    if (color.name === 'noir') {
      return {
        semantic: {
          primary: {
            50: '{surface.50}',
            100: '{surface.100}',
            200: '{surface.200}',
            300: '{surface.300}',
            400: '{surface.400}',
            500: '{surface.500}',
            600: '{surface.600}',
            700: '{surface.700}',
            800: '{surface.800}',
            900: '{surface.900}',
            950: '{surface.950}',
          },
          colorScheme: {
            light: {
              primary: {
                color: '{primary.950}',
                contrastColor: '#ffffff',
                hoverColor: '{primary.800}',
                activeColor: '{primary.700}',
              },
              highlight: {
                background: '{primary.950}',
                focusBackground: '{primary.700}',
                color: '#ffffff',
                focusColor: '#ffffff',
              },
            },
            dark: {
              primary: {
                color: '{primary.50}',
                contrastColor: '{primary.950}',
                hoverColor: '{primary.200}',
                activeColor: '{primary.300}',
              },
              highlight: {
                background: '{primary.50}',
                focusBackground: '{primary.300}',
                color: '{primary.950}',
                focusColor: '{primary.950}',
              },
            },
          },
        },
      };
    } else {
      return {
        semantic: {
          primary: color.palette,
          colorScheme: {
            light: {
              primary: {
                color: '{primary.500}',
                contrastColor: '#ffffff',
                hoverColor: '{primary.600}',
                activeColor: '{primary.700}',
              },
              highlight: {
                background: '{primary.50}',
                focusBackground: '{primary.100}',
                color: '{primary.700}',
                focusColor: '{primary.800}',
              },
            },
            dark: {
              primary: {
                color: '{primary.400}',
                contrastColor: '{surface.900}',
                hoverColor: '{primary.300}',
                activeColor: '{primary.200}',
              },
              highlight: {
                background:
                  'color-mix(in srgb, {primary.400}, transparent 84%)',
                focusBackground:
                  'color-mix(in srgb, {primary.400}, transparent 76%)',
                color: 'rgba(255,255,255,.87)',
                focusColor: 'rgba(255,255,255,.87)',
              },
            },
          },
        },
      };
    }
  }

  updateColors(event: any, type: string, color: any) {
    console.log('updateColors -> ', event, type, color);
    if (type === 'primary') {
      updateLayoutConfig({ primary: color.name });
    } else if (type === 'surface') {
      updateLayoutConfig({ surface: color.name });
    }
    this.applyTheme(type, color);
    this.zone.run(() => this.cd.detectChanges());
    window.dispatchEvent(new CustomEvent('layout-updated'));
    event.stopPropagation();
  }
  changeMenuTheme(theme: string) {
    this.menuTheme = theme;
  }

  changeTopbarTheme(theme: string) {
    this.topbarTheme = theme;
    window.dispatchEvent(new CustomEvent('layout-updated'));
  }

  toggleConfigSidebar() {
    updateLayoutState({
      configSidebarVisible: !getLayoutConfig().configSidebarVisible,
    });
  }

  onClose() {
    this.closed.emit();
  }
}
