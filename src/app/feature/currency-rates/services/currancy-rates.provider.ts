import { Injectable } from '@angular/core';
import { map, merge, NEVER, Observable, of, switchMap, tap } from 'rxjs';
import { CurrencyName, CurrencyRate } from '../models/currency-rate.model';
import { CurrencyRatesHttp } from './currancy-rates.http';
import { CurrencyRatesState } from './currancy-rates.state';

@Injectable()
export class CurrencyRatesProvider {
    readonly currencyRates$: Observable<CurrencyRate[]>;
    readonly optionalCurrencyNames$ = this.state.optionalCurrencyNames$;
    readonly isSelectedCurrencyNamesSetEmpty$: Observable<boolean>;
    readonly isOptionalCurrencyNamesSetEmpty$: Observable<boolean>;

    constructor(
        private readonly http: CurrencyRatesHttp,
        private readonly state: CurrencyRatesState,
    ) {
        this.currencyRates$ = this.createCurrencyRates$();
        this.isSelectedCurrencyNamesSetEmpty$ =
            this.createisSelectedCurrencyNamesSetEmpty$();
        this.isOptionalCurrencyNamesSetEmpty$ =
            this.createOptionalCurrencyNames$();
    }

    fetchCurrencyRates(): Observable<CurrencyRate[]> {
        return this.state.selectedCurrencyNames$.pipe(
            switchMap((currencyNames) => {
                if (currencyNames.size) {
                    return this.http.getCurrencyRates(currencyNames);
                } else {
                    return of([]);
                }
            }),
            tap((currencyRates) => {
                this.state.setCurrencyRates(currencyRates);
            }),
        );
    }

    deleteCurrencyRate(currencyName: CurrencyName): void {
        this.state.deleteCurrencyRate(currencyName);
    }

    addCurrencyRate(currencyName: CurrencyName): void {
        this.state.addCurrencyRate(currencyName);
    }

    getCurrencyNameToSelect(): CurrencyName | null {
        return this.state.getCurrencyNameToSelect();
    }

    private createCurrencyRates$(): Observable<CurrencyRate[]> {
        return merge(
            this.state.currencyRates$,
            this.fetchCurrencyRates().pipe(switchMap(() => NEVER)),
        );
    }

    private createOptionalCurrencyNames$(): Observable<boolean> {
        return this.state.optionalCurrencyNames$.pipe(
            map((optionalCurrencyNames) => !optionalCurrencyNames.size),
        );
    }
    private createisSelectedCurrencyNamesSetEmpty$(): Observable<boolean> {
        return this.state.selectedCurrencyNames$.pipe(
            map((selectedCurrencyNames) => !selectedCurrencyNames.size),
        );
    }
}
