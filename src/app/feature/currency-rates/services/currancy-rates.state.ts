import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrencyName, CurrencyRate } from '../models/currency-rate.model';

@Injectable()
export class CurrencyRatesState {
    private readonly selectedCurrencyNamesSubject = new BehaviorSubject<
        Set<CurrencyName>
    >(new Set(['RUB', 'EUR', 'USD']));
    private readonly optionalCurrencyNamesSubject = new BehaviorSubject<
        Set<CurrencyName>
    >(new Set(['CNY', 'JPY', 'TRY']));
    private readonly currencyRatesSubject = new BehaviorSubject<CurrencyRate[]>(
        [],
    );

    readonly selectedCurrencyNames$ =
        this.selectedCurrencyNamesSubject.asObservable();
    readonly optionalCurrencyNames$ =
        this.optionalCurrencyNamesSubject.asObservable();
    readonly currencyRates$ = this.currencyRatesSubject.asObservable();

    setCurrencyRates(currencyRates: CurrencyRate[]): void {
        this.currencyRatesSubject.next(currencyRates);
    }

    deleteCurrencyRate(currencyName: CurrencyName): void {
        const selectedCurrencyNames = new Set(
            this.selectedCurrencyNamesSubject.getValue(),
        );
        selectedCurrencyNames.delete(currencyName);
        this.selectedCurrencyNamesSubject.next(selectedCurrencyNames);
        const optionalCurrencyNames = new Set(
            this.optionalCurrencyNamesSubject.getValue(),
        );
        optionalCurrencyNames.add(currencyName);
        this.optionalCurrencyNamesSubject.next(optionalCurrencyNames);
    }

    getCurrencyNameToSelect(): CurrencyName | null {
        return [...this.optionalCurrencyNamesSubject.getValue()][0] ?? null;
    }
}
