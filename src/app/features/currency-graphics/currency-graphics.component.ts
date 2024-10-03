import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyName } from '../currency-rates/models/currency-rate.model';
import { LayoutComponent } from './../../core/components/layout/layout.component';
import { CurrencyGraphicsDataSource } from './models/currency-rates-data-source.model';
import { ScatterComponent } from './scatter/scatter.component';
import { CurrencyGraphicsProvider } from './services/currancy-graphics.provider';
import { CurrencyGraphicsState } from './services/currancy-graphics.state';
import { currencyGraphicsDataSourceFactory } from './utils/currency-rates-data-source.factory';

@Component({
    selector: 'ct-currency-graphics',
    standalone: true,
    imports: [LayoutComponent, ScatterComponent],
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
    langName: CurrencyName;

    constructor(
        private activatedRoute: ActivatedRoute,
        private readonly provider: CurrencyGraphicsProvider,
        private readonly router: Router,
    ) {
        this.langName = this.activatedRoute.snapshot.paramMap.get('name') as CurrencyName;
        let lastValue = this.router.getCurrentNavigation()?.extras.state?.['currencyRate'];
        this.provider.getScatterDataState(this.langName, lastValue);
    }
}
