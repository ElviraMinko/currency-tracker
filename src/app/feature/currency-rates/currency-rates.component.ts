import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval } from 'rxjs';
import { CurrencyRate } from './models/currency-rate.model';
import { CurrencyRatesHttp } from './services/currancy-rates.http';
import { CurrencyRatesProvider } from './services/currancy-rates.provider';
import { CurrencyRatesState } from './services/currancy-rates.state';

@Component({
    selector: 'app-currency',
    standalone: true,
    imports: [
        HttpClientModule,
        FormsModule,
        CommonModule,
        DecimalPipe,
        AsyncPipe,
    ],
    templateUrl: 'currency-rates.component.html',
    styleUrl: './currency-rates.component.scss',
    providers: [CurrencyRatesProvider, CurrencyRatesState, CurrencyRatesHttp],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyRatesComponent {
    actualDateAndTime: Date = new Date();
    isCurrencySelected: boolean = true;
    visibleCurrencies: CurrencyRate[] = [];

    currencyRates$ = this.provider.currencyRates$;
    optionalCurrencyNames$ = this.state.optionalCurrencyNames$;
    currencyNameToSelect$ = this.state.currencyNameToSelect$;

    constructor(
        private readonly provider: CurrencyRatesProvider,
        private readonly changeDetector: ChangeDetectorRef,
        private readonly state: CurrencyRatesState,
    ) {}

    ngOnInit(): void {
        // this.updateVisibleCurrencies();
        // this.runTimeUpdateProcess();
        this.runTimeUpdateProcessByRxJs();
    }

    deleteCurrencyRate(currency: CurrencyRate): void {
        this.state.deleteCurrencyRate(currency.name);
    }

    // addCurrency(): void {
    //     if (this.selectedCurrencyName === null) {
    //         this.isCurrencySelected = false;
    //         return;
    //     }
    //     this.isCurrencySelected = true;
    //     this.visibleCurrencyNames.add(this.selectedCurrencyName);
    //     this.optionalCurrencyNames.delete(this.selectedCurrencyName);
    //     this.updateVisibleCurrencies();
    //     this.selectedCurrencyName = [...this.optionalCurrencyNames][0] ?? null;
    // }

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
