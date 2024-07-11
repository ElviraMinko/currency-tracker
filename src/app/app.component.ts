import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyRatesHttpService } from './currancy-rates.http.service';
import { CurrencyName, CurrencyRate } from './currency-rate.model';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HttpClientModule, FormsModule, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [CurrencyRatesHttpService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    selectedCurrencyName: CurrencyName | null = null;
    visibleCurrencies: CurrencyRate[] = [];
    readonly visibleCurrencyNames: Set<CurrencyName> = new Set([
        'RUB',
        'EUR',
        'USD',
    ]);
    readonly optionalCurrencyNames: Set<CurrencyName> = new Set([
        'CNY',
        'JPY',
        'TRY',
    ]);

    constructor(
        private readonly httpService: CurrencyRatesHttpService,
        private readonly changeDetector: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.updateVisibleCurrencies();
    }

    deleteCurrencyRate(currency: CurrencyRate): void {
        this.visibleCurrencyNames.delete(currency.name);
        this.optionalCurrencyNames.add(currency.name);
        this.updateVisibleCurrencies();
    }

    addCurrency(): void {
        if (this.selectedCurrencyName === null) {
            return;
        }
        this.visibleCurrencyNames.add(this.selectedCurrencyName);
        this.optionalCurrencyNames.delete(this.selectedCurrencyName);
        this.updateVisibleCurrencies();
    }

    updateVisibleCurrencies() {
        if (!this.visibleCurrencyNames.size) {
            this.visibleCurrencies = [];
            return;
        }
        this.httpService.getCurrencyRates(this.visibleCurrencyNames).subscribe({
            next: (data: CurrencyRate[]) => {
                this.visibleCurrencies = data;
                this.changeDetector.markForCheck();
            },
        });
    }
}
