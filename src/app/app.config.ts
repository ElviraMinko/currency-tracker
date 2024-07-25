import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { CurrencyRatesComponent } from './feature/currency-rates/currency-rates.component';
import { LoginComponent } from './feature/login/login.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: CurrencyRatesComponent,
        canActivate: [AuthGuard],
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
