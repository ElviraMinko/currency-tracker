import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

// компоненты, которые сопоставляются с маршрутами
import { CurrencyRatesComponent } from './feature/currency-rates/currency-rates.component';
import { LoginComponent } from './feature/login/login.component';

// определение маршрутов
const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'currency', component: CurrencyRatesComponent },
    { path: '**', redirectTo: '/' },
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(appRoutes)],
};
