import { Injectable } from '@angular/core';
import { map, merge, NEVER, Observable, of, switchMap, tap } from 'rxjs';
import { CurrencyName } from '../../../core/models/currency-name.model';
import { DataState } from '../../../core/models/data-state.model';
import { CurrencyDescription, CurrencyRate } from '../models/currency-rate.model';
import { CurrencyRatesDataSource } from '../models/currency-rates-data-source.model';
import { mapCurrencyCountries } from './../constants/currency-rate.constant';
import { CurrencyRatesState } from './currancy-rates.state';

@Injectable()
export class CurrencyRatesProvider {
    readonly currencyDescription$: Observable<DataState<CurrencyDescription[]>>;
    readonly optionalCurrencyNames$ = this.state.optionalCurrencyNames$;
    readonly isSelectedCurrencyNamesSetEmpty$: Observable<boolean>;
    readonly isOptionalCurrencyNamesSetEmpty$: Observable<boolean>;

    constructor(
        private readonly dataSource: CurrencyRatesDataSource,
        private readonly state: CurrencyRatesState,
    ) {
        this.currencyDescription$ = this.createCurrencyDescription$();
        this.isSelectedCurrencyNamesSetEmpty$ = this.createisSelectedCurrencyNamesSetEmpty$();
        this.isOptionalCurrencyNamesSetEmpty$ = this.createOptionalCurrencyNames$();
    }

    fetchCurrencyRates(): Observable<CurrencyRate[]> {
        return this.state.selectedCurrencyNames$.pipe(
            tap(() => {
                this.state.setCurrencyDescriptions({
                    status: 'loading',
                    data: [],
                });
            }),
            switchMap((currencyNames) => {
                if (currencyNames.size) {
                    return this.dataSource.getCurrencyRates(currencyNames);
                } else {
                    return of([]);
                }
            }),
            tap((currencyRates) => {
                this.state.setCurrencyDescriptions({
                    status: 'success',
                    data: currencyRates.map((currencyRate) => {
                        const currencyCountry = mapCurrencyCountries[currencyRate.name];
                        return {
                            iconUrl: currencyCountry.iconUrl,
                            countryName: currencyCountry.countryName,
                            name: currencyRate.name,
                            rate: currencyRate.rate,
                        };
                    }),
                });
            }),
        );
    }

    deleteCurrencyRate(currencyName: CurrencyName): void {
        this.state.deleteCurrencyRate(currencyName);
    }

    addCurrencyRate(currencyName: CurrencyName[]): void {
        this.state.addCurrencyRate(currencyName);
    }

    getCurrencyNameToSelect(): CurrencyName | null {
        return this.state.getCurrencyNameToSelect();
    }
    getOptionalCurrencyNames(): Set<CurrencyName> {
        return this.state.getOptionalCurrencyNames();
    }

    private createCurrencyDescription$(): Observable<DataState<CurrencyDescription[]>> {
        return merge(this.state.currencyDescription$, this.fetchCurrencyRates().pipe(switchMap(() => NEVER)));
    }

    private createOptionalCurrencyNames$(): Observable<boolean> {
        return this.state.optionalCurrencyNames$.pipe(map((optionalCurrencyNames) => !optionalCurrencyNames.size));
    }
    private createisSelectedCurrencyNamesSetEmpty$(): Observable<boolean> {
        return this.state.selectedCurrencyNames$.pipe(map((selectedCurrencyNames) => !selectedCurrencyNames.size));
    }
}
