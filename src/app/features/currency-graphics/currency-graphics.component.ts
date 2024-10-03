import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { AuthService } from '../../core/services/auth-service';
import { LayoutComponent } from './../../core/components/layout/layout.component';
import { CurrencyName } from './../../core/models/currency-name.model';
import { CurrencyRateScatterComponent } from './components/currency-rate-scatter/currency-rate-scatter.component';
import { CurrencyGraphicsDataSource } from './models/currency-rates-data-source.model';
import { CurrencyGraphicsProvider } from './services/currancy-graphics.provider';
import { CurrencyGraphicsState } from './services/currancy-graphics.state';
import { currencyGraphicsDataSourceFactory } from './utils/currency-rates-data-source.factory';

@Component({
    selector: 'ct-currency-graphics',
    standalone: true,
    imports: [LayoutComponent, CurrencyRateScatterComponent, TranslocoModule, NzButtonModule, NzSpaceModule],
    templateUrl: 'currency-graphics.component.html',
    styleUrl: './currency-graphics.component.scss',
    providers: [
        CurrencyGraphicsProvider,
        CurrencyGraphicsState,
        {
            provide: CurrencyGraphicsDataSource,
            useFactory: currencyGraphicsDataSourceFactory,
            deps: [HttpClient],
        },
    ],

    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyGraphicComponent {
    currencyName: CurrencyName;

    constructor(
        private activatedRoute: ActivatedRoute,
        private readonly provider: CurrencyGraphicsProvider,
        private readonly router: Router,
        private readonly authService: AuthService,
    ) {
        this.currencyName = this.activatedRoute.snapshot.paramMap.get('name') as CurrencyName;
        let latestValueOfCurrencyRate = this.router.getCurrentNavigation()?.extras.state?.['currencyRate'];
        this.provider.getScatterDataState(this.currencyName, latestValueOfCurrencyRate);
    }

    logout(): void {
        this.authService.logout();
    }

    redirectToCurrencyRatesPage() {
        this.router.navigate(['']);
    }
}
