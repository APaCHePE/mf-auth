# Login

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Comands necesaries

Comando para extraer la estructura de carpetas:

```bash
 find . -type d -not -path "*/node_modules/*" -not -path "*/dist/*" -not -path "*/.git/*" -not -path "*/.angular/*" -not -path "*/public/*" | sed 's/[^\/]*\//--/g;s/--/|__/g'

 find . -not -path "*/node_modules/*" -not -path "*/dist/*" -not -path "*/.git/*" -not -path "*/.angular/*" -not -path "*/public/*" | sed 's/[^\/]*\//--/g;s/--/|__/g'

find . -type f -not -path "*/node_modules/*" -not -path "*/dist/*" -not -path "*/.git/*" -not -path "*/.angular/*" -not -path "*/public/*" | sed 's/[^\/]*\//--/g;s/--/|__/g'

```
## Librerias

Se necesita agregar librerias:

```bash
npm install -D tailwindcss@3
npm install http-server
npm i primeicons
npm install primeng
npm install @primeng/themes

npm install tailwindcss-primeui
npm install http-server
npm install postcss autoprefixer
npm install @angular/animations
npm install concurrently
npm install chart.js

Todo en uno

create-single-spa
npm install tailwindcss@3 http-server primeicons primeng @primeng/themes tailwindcss-primeui  postcss autoprefixer @angular/animations concurrently chart.js

npx tailwind init
```


PASO 1 
EJECUTAR EL COMANDO 
create-single-spa
con este comando escoges crear en la misma carpeta
escoges trabajar con SCSS
ingresas el nombre del proyecto:
ingresas el puerto: 

Luego que se crea el proyecto debes instalar estas librerias:
npm install tailwindcss@3 http-server primeicons primeng @primeng/themes tailwindcss-primeui  postcss autoprefixer @angular/animations concurrently chart.js

luego debes modificar el archivo angular.json de tal forma que quede de la siguiente manera (En este ejemplo el proyecto se llama 'mf-authentication' y corre en el puerto 1000):
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "mf-authentication": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "outputPath": "dist/mf-authentication",
            "index": "src/index.html",
            "main": "src/main.single-spa.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": [{
              "glob": "**/*",
              "input": "public"
            }],
            "styles": [
              "src/styles.scss"
            ],
            "stylePreprocessorOptions": {
              "includePaths": ["src"]
            },
            "scripts": [],
            "customWebpackConfig": {
              "path": "extra-webpack.config.js",
              "libraryName": "mf-authentication",
              "libraryTarget": "umd"
            },
            "deployUrl": "http://localhost:1000/"
          },
          "configurations": {
            "production": {
              "budgets": [{
                  "type": "initial",
                  "maximumWarning": "500kB",
                  "maximumError": "1MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "4kB",
                  "maximumError": "8kB"
                }
              ],
              "outputHashing": "none"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true,
              "outputHashing": "none"
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server",
          "options": {
            "port": 1000,
            "disableHostCheck": true
          },
          "configurations": {
            "production": {
              "buildTarget": "mf-authentication:build:production"
            },
            "development": {
              "buildTarget": "mf-authentication:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n"
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],
            "tsConfig": "tsconfig.spec.json",
            "inlineStyleLanguage": "scss",
            "assets": [{
              "glob": "**/*",
              "input": "public"
            }],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          }
        }
      }
    }
  },
  "cli": {
    "analytics": "a1878987-9e16-45d2-a636-01dc94093233"
  }
}

luego debes eliminar los siguientes archivos:

src/app/app.config.server.ts
src/app/app.routes.server.ts
src/main.server.ts
src/main.ts
src/server.ts

LUEGO DE ESO DEBES CREAR EL ARCHIVO tailwind.config.js con la siguiente informacion:

/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

export default {
    darkMode: ['selector', '[class*="app-dark"]'],
    content: ['./index.html', './src/**/*.{js,ts}', './public/**/*.json'],
    plugins: [PrimeUI],
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        }
    }
};

luego crear el archivo src/tailwind.css con la siguiente info:

@tailwind base;
@tailwind components;
@tailwind utilities;

luego modificar el archivo src/styles.scss con la siguiente info:

@import './tailwind.css';
@use './assets/layout/layout.scss';
@import "primeicons/primeicons.css";

el archivo src/app/app.config.ts debe quedar de la siguiente forma:


import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeng/themes/material';
import { definePreset } from '@primeng/themes';
import { MessageService } from 'primeng/api';

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
    provideRouter(routes,
      withEnabledBlockingInitialNavigation()),
    {
      provide: APP_BASE_HREF,
      useValue: '/',
    },
    MessageService,
    getSingleSpaExtraProviders(),
    providePrimeNG({
      ripple: true,
      inputStyle: 'filled',
      theme: { preset: MyPreset, options: { darkModeSelector: '.app-dark' } },
    }),
    provideAnimations(),
  ],
};




el archivo src/main.single-spa.ts debe quedar de la siguiente forma:

import { enableProdMode, NgZone } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';

import { singleSpaAngular } from 'single-spa-angular';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';


if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    console.log('✅ Ejecutando bootstrapFunction', singleSpaProps);
    singleSpaPropsSubject.next(singleSpaProps);
    return bootstrapApplication(AppComponent, appConfig);
  },
  template: '<app-layout />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;