import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Routes, provideRouter } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
import { avalibleLangs } from './core/constansts/i18n.constant';
import { AuthGuard } from './core/guards/auth.guard';
import { CurrencyGraphicComponent } from './features/currency-graphics/currency-graphics.component';
import { CurrencyRatesComponent } from './features/currency-rates/currency-rates.component';
import { LoginComponent } from './features/login/login.component';
import { TranslocoHttpLoader } from './transloco-loader';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'graphic/:name', component: CurrencyGraphicComponent, canActivate: [AuthGuard] },
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
        provideTransloco({
            config: {
                availableLangs: avalibleLangs,
                defaultLang: 'en',
                reRenderOnLangChange: true,
            },
            loader: TranslocoHttpLoader,
        }),
    ],
};
