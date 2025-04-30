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


