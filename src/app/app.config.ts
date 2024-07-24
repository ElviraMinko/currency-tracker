import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CurrencyRatesComponent } from './feature/currency-rates/currency-rates.component';
import { LoginComponent } from './feature/login/login.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: CurrencyRatesComponent,
        pathMatch: 'full',
    },
    { path: '**', redirectTo: '/' },
];

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes),
        provideAnimations(),
        provideHttpClient(),
    ],
};
