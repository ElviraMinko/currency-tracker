import { HttpClientModule } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { CurrancyRatesHttpService } from './currancy-rates.http.service';
import { CurrencyRate } from './currency-rate.model';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HttpClientModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [CurrancyRatesHttpService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    visibleCurrencies: CurrencyRate[] = [];

    constructor(
        private readonly httpService: CurrancyRatesHttpService,
        private changeDetection: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.httpService.getCurrencyRates().subscribe({
            next: (data: CurrencyRate[]) => {
                this.visibleCurrencies = data;
                console.log(data);
                this.changeDetection.markForCheck();
            },
        });
    }

    deleteCurrencyRate(currency: CurrencyRate): void {
        this.visibleCurrencies = this.visibleCurrencies.filter((rate) => {
            return rate.name !== currency.name;
        });
        this.changeDetection.markForCheck();
    }
}
