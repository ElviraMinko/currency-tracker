import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { interval } from 'rxjs';
import { CurrencyName, CurrencyRate } from './models/currency-rate.model';
import { CurrencyRatesHttp } from './services/currancy-rates.http';
import { CurrencyRatesProvider } from './services/currancy-rates.provider';
import { CurrencyRatesState } from './services/currancy-rates.state';

@Component({
    selector: 'app-currency',
    standalone: true,
    imports: [
        HttpClientModule,
        ReactiveFormsModule,
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
    selectedCurrencyNameControl: FormControl<CurrencyName | null>;
    actualDateAndTime: Date = new Date();
    isCurrencySelected: boolean = true;
    visibleCurrencies: CurrencyRate[] = [];

    currencyRates$ = this.provider.currencyRates$;
    optionalCurrencyNames$ = this.state.optionalCurrencyNames$;

    constructor(
        private readonly provider: CurrencyRatesProvider,
        private readonly changeDetector: ChangeDetectorRef,
        private readonly state: CurrencyRatesState,
    ) {
        this.selectedCurrencyNameControl = new FormControl<CurrencyName | null>(
            this.state.getCurrencyNameToSelect(),
        );
    }

    ngOnInit(): void {
        // this.updateVisibleCurrencies();
        // this.runTimeUpdateProcess();
        this.runTimeUpdateProcessByRxJs();
    }

    deleteCurrencyRate(currency: CurrencyRate): void {
        this.state.deleteCurrencyRate(currency.name);
    }

    addCurrency(): void {
        console.log(this.selectedCurrencyNameControl.value);
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
