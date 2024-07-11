import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval } from 'rxjs';
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
    actualDateAndTime: Date = new Date();
    isCurrencySelected: boolean = true;
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
        // this.runTimeUpdateProcess();
        this.runTimeUpdateProcessByRxJs();
    }

    deleteCurrencyRate(currency: CurrencyRate): void {
        this.visibleCurrencyNames.delete(currency.name);
        this.optionalCurrencyNames.add(currency.name);
        this.updateVisibleCurrencies();
    }

    addCurrency(): void {
        if (this.selectedCurrencyName === null) {
            this.isCurrencySelected = false;
            return;
        }
        this.isCurrencySelected = true;
        this.visibleCurrencyNames.add(this.selectedCurrencyName);
        this.optionalCurrencyNames.delete(this.selectedCurrencyName);
        this.updateVisibleCurrencies();
        this.selectedCurrencyName = null;
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
    runTimeUpdateProcess() {
        setInterval(() => {
            this.actualDateAndTime = new Date();
            this.changeDetector.markForCheck();
        }, 1000);
    }

    runTimeUpdateProcessByRxJs() {
        interval(1000).subscribe(() => {
            this.actualDateAndTime = new Date();
            this.changeDetector.markForCheck();
        });
    }
}
