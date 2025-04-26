import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeng/themes/material';
import Aura from '@primeng/themes/aura';
import { definePreset } from '@primeng/themes';
import { MessageService } from 'primeng/api';
import { authInterceptor } from './shared/interceptors/auth.interceptor';

import { routes } from './app.routes';
import { getSingleSpaExtraProviders } from 'single-spa-angular';
import { APP_BASE_HREF } from '@angular/common';

const MyPreset = definePreset(Material, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}'
    },
    surface: {
      50: '#ffffff',
      950: '#1a1a1a'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.500}',
          contrastColor: '#ffffff'
        }
      },
      dark: {
        primary: {
          color: '{primary.100}',
          contrastColor: '#1a1a1a'
        }
      }
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: APP_BASE_HREF,
      useValue: '/',
    },
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    MessageService,
    getSingleSpaExtraProviders(),
    providePrimeNG({
      theme: { preset: MyPreset, options: { darkModeSelector: '.app-dark' } },
    }),
    provideAnimations(),
  ],
};
