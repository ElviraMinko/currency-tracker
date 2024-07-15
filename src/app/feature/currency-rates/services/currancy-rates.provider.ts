import { Injectable } from '@angular/core';
import { merge, NEVER, Observable, switchMap, tap } from 'rxjs';
import { CurrencyRate } from '../models/currency-rate.model';
import { CurrencyRatesHttp } from './currancy-rates.http';
import { CurrencyRatesState } from './currancy-rates.state';

@Injectable()
export class CurrencyRatesProvider {
    readonly currencyRates$ = merge(
        this.state.currencyRates$,
        this.fetchCurrencyRates().pipe(switchMap(() => NEVER)),
    );

    constructor(
        private readonly http: CurrencyRatesHttp,
        private readonly state: CurrencyRatesState,
    ) {}

    fetchCurrencyRates(): Observable<CurrencyRate[]> {
        return this.state.selectedCurrencyNames$.pipe(
            switchMap((currencyNames) =>
                this.http.getCurrencyRates(currencyNames),
            ),
            tap((currencyRates) => {
                this.state.setCurrencyRates(currencyRates);
            }),
        );
    }
}
