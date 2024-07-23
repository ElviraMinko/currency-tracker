import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { CurrencyName, CurrencyRate } from '../models/currency-rate.model';
import { CurrencyRatesDataSource } from '../models/currency-rates-data-source.model';
import { mockRecordCurrencyRates } from './../constants/currency-rate.constant';

@Injectable()
export class CurrencyRatesMock implements CurrencyRatesDataSource {
    getCurrencyRates(
        currencyNames: Set<CurrencyName>,
    ): Observable<CurrencyRate[]> {
        return of(
            [...currencyNames].map((currancyName) => {
                return {
                    name: currancyName,
                    rate: mockRecordCurrencyRates[currancyName],
                };
            }),
        ).pipe(delay(300));
    }
}
