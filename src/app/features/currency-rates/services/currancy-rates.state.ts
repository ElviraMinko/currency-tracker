import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrencyName } from '../../../core/models/currency-name.model';
import { DataState } from '../../../core/models/data-state.model';
import { CurrencyDescription } from '../models/currency-rate.model';

@Injectable()
export class CurrencyRatesState {
    private readonly selectedCurrencyNamesSubject = new BehaviorSubject<Set<CurrencyName>>(
        new Set(['RUB', 'EUR', 'USD']),
    );
    private readonly optionalCurrencyNamesSubject = new BehaviorSubject<Set<CurrencyName>>(
        new Set(['CNY', 'JPY', 'TRY']),
    );
    private readonly currencyDescriptionSubject = new BehaviorSubject<DataState<CurrencyDescription[]>>({
        status: 'idle',
        data: [],
    });

    readonly selectedCurrencyNames$ = this.selectedCurrencyNamesSubject.asObservable();
    readonly optionalCurrencyNames$ = this.optionalCurrencyNamesSubject.asObservable();
    readonly currencyDescription$ = this.currencyDescriptionSubject.asObservable();

    setCurrencyDescriptions(currencyRates: DataState<CurrencyDescription[]>): void {
        this.currencyDescriptionSubject.next(currencyRates);
    }

    deleteCurrencyRate(currencyName: CurrencyName): void {
        const selectedCurrencyNames = new Set(this.selectedCurrencyNamesSubject.getValue());
        selectedCurrencyNames.delete(currencyName);
        this.selectedCurrencyNamesSubject.next(selectedCurrencyNames);
        const optionalCurrencyNames = new Set(this.optionalCurrencyNamesSubject.getValue());
        optionalCurrencyNames.add(currencyName);
        this.optionalCurrencyNamesSubject.next(optionalCurrencyNames);
    }

    addCurrencyRate(currencyName: CurrencyName[]): void {
        const optionalCurrencyNames = new Set(this.optionalCurrencyNamesSubject.getValue());
        const selectedCurrencyNames = new Set(this.selectedCurrencyNamesSubject.getValue());

        currencyName.forEach((currencyName) => {
            optionalCurrencyNames.delete(currencyName);
            selectedCurrencyNames.add(currencyName);
        });
        this.optionalCurrencyNamesSubject.next(optionalCurrencyNames);
        this.selectedCurrencyNamesSubject.next(selectedCurrencyNames);
    }

    getCurrencyNameToSelect(): CurrencyName | null {
        return [...this.optionalCurrencyNamesSubject.getValue()][0] ?? null;
    }

    getOptionalCurrencyNames(): Set<CurrencyName> {
        return this.optionalCurrencyNamesSubject.value;
    }
}
