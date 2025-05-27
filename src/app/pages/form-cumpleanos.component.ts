import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-cumpleanos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>🎉 Registro de Cumpleaños</h2>
      <form (ngSubmit)="enviar()" class="formulario">
        <label>Nombre:</label>
        <input [(ngModel)]="nombre" name="nombre" required />

        <label>Fecha de cumpleaños:</label>
        <input type="date" [(ngModel)]="cumple" name="cumple" required />

        <button type="submit">Enviar</button>
      </form>
      <div *ngIf="enviado" class="mensaje">
        ¡Gracias, {{ nombre }}! Registramos tu cumple para enviarte saludos 🎈
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    .formulario {
      display: flex;
      flex-direction: column;
    }
    label {
      margin-top: 1rem;
    }
    input {
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid #aaa;
    }
    button {
      margin-top: 1.5rem;
      padding: 0.7rem;
      background-color: #4a90e2;
      color: white;
      border: none;
      border-radius: 4px;
    }
    .mensaje {
      margin-top: 1rem;
      color: green;
    }
  `]
})
export class FormCumpleanosComponent {
  nombre = '';
  cumple = '';
  enviado = false;

  enviar() {
    this.enviado = true;
    console.log(`Nombre: ${this.nombre} | Cumpleaños: ${this.cumple}`);
  }
}
