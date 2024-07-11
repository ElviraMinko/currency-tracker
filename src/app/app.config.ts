import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

// компоненты, которые сопоставляются с маршрутами
import { CurrencyComponent } from './components/currency/currency.component';
import { LoginComponent } from './components/login/login.component';

// определение маршрутов
const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'currency', component: CurrencyComponent },
    { path: '**', redirectTo: '/' },
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(appRoutes)],
};
