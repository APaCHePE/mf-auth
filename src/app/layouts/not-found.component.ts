import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterModule, ButtonModule, RippleModule],
  template: `
    <div
      class="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 py-10"
      [style]="{ backgroundImage: 'url(/assets/images/404-bg.jpg)' }"
    >
      <div class="max-w-lg text-center bg-white dark:bg-surface-700 p-8 rounded-2xl shadow-xl border border-slate-300 dark:border-surface-600">
        <div class="text-3xl font-bold text-slate-800 dark:text-white mb-2">Oops! Página no encontrada</div>
        <div class="text-slate-500 dark:text-slate-300 mb-6">
          La página que estás buscando no existe o ha sido movida.
        </div>
        <img
          src="/assets/images/404-illustration.svg"
          alt="404"
          class="mx-auto mb-6 max-h-64"
        />
        <button
          pButton
          pRipple
          label="Volver al Inicio"
          class="w-full"
          [routerLink]="['/']"
        ></button>
      </div>
    </div>
  `,
})
export class NotFoundPublicComponent {}
