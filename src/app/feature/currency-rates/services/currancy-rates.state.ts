import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CurrencyName, CurrencyRate } from '../models/currency-rate.model';

@Injectable()
export class CurrencyRatesState {
    readonly selectedCurrencyNames$ = new BehaviorSubject<Set<CurrencyName>>(
        new Set(['RUB', 'EUR', 'USD']),
    );

    readonly optionalCurrencyNames$ = new BehaviorSubject<Set<CurrencyName>>(
        new Set(['CNY', 'JPY', 'TRY']),
    );

    readonly currencyRates$ = new BehaviorSubject<CurrencyRate[]>([]);
    readonly currencyNameToSelect$: Observable<CurrencyName | null> =
        this.optionalCurrencyNames$.pipe(
            map((currencyNames) => [...currencyNames][0] ?? null),
        );

    setCurrencyRates(currencyRates: CurrencyRate[]): void {
        this.currencyRates$.next(currencyRates);
    }

    deleteCurrencyRate(currencyName: CurrencyName): void {
        const selectedCurrencyNames = new Set(
            this.selectedCurrencyNames$.getValue(),
        );
        selectedCurrencyNames.delete(currencyName);
        this.selectedCurrencyNames$.next(selectedCurrencyNames);
        const optionalCurrencyNames = new Set(
            this.optionalCurrencyNames$.getValue(),
        );
        optionalCurrencyNames.add(currencyName);
        this.optionalCurrencyNames$.next(optionalCurrencyNames);
    }
}
