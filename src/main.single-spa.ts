import { enableProdMode, NgZone } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router, NavigationStart, provideRouter } from '@angular/router';

import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';


// import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_BASE_HREF } from '@angular/common';
import { EmptyRouteComponent } from './app/empty-route/empty-route.component';

// import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';
import { appConfig } from './app/app.config';

// if (environment.production) {
//   enableProdMode();
// }
console.log('✅ Entrando a main.single-spa.ts');
const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    console.log('✅ Ejecutando bootstrapFunction', singleSpaProps);
    singleSpaPropsSubject.next(singleSpaProps);
    // return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppComponent);
    return bootstrapApplication(AppComponent, {
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        getSingleSpaExtraProviders(),
        ...appConfig.providers!,
      ],
    });
  },
  template: '<app-root />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
