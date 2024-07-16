import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class CurrencyRatesComponent implements OnInit {
    readonly selectedCurrencyNameControl: FormControl<CurrencyName | null>;
    actualDateAndTime: Date = new Date();
    isSelectedCurrencyNamesSetEmpty$ =
        this.provider.isSelectedCurrencyNamesSetEmpty$;
    isOptionalCurrencyNamesSetEmpty$ =
        this.provider.isOptionalCurrencyNamesSetEmpty$;
    readonly currencyRates$ = this.provider.currencyRates$;
    readonly optionalCurrencyNames$ = this.provider.optionalCurrencyNames$;

    constructor(
        private readonly provider: CurrencyRatesProvider,
        private readonly changeDetector: ChangeDetectorRef,
        private readonly destroyRef: DestroyRef,
    ) {
        this.selectedCurrencyNameControl = new FormControl<CurrencyName | null>(
            this.provider.getCurrencyNameToSelect(),
        );
    }

    ngOnInit(): void {
        this.runTimeUpdateProcessByRxJs();
    }

    deleteCurrencyRate(currency: CurrencyRate): void {
        this.provider.deleteCurrencyRate(currency.name);
    }

    addCurrency(): void {
        if (!this.selectedCurrencyNameControl.value) {
            return;
        }
        this.provider.addCurrencyRate(this.selectedCurrencyNameControl.value);
    }

    runTimeUpdateProcessByRxJs(): void {
        interval(1000)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.actualDateAndTime = new Date();
                this.changeDetector.markForCheck();
            });
    }
}
