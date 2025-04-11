// import { TestBed } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import { RouterTestingModule } from '@angular/router/testing';

// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,
//         AppComponent
//       ],
//     }).compileComponents();
//   });

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it('should show router-outlet by default', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('router-outlet')).toBeTruthy();
//   });

//   it('should show navbar when in component mode', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.componentInstance.showLayoutComponents = true;
//     fixture.componentInstance.showNavbar = true;
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('app-navbar')).toBeTruthy();
//   });
// });