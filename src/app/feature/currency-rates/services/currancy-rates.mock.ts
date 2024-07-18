import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CurrencyName, CurrencyRate } from '../models/currency-rate.model';
import { CurrencyRatesDataSource } from '../models/currency-rates-data-source.model';

@Injectable()
export class CurrencyRatesMock implements CurrencyRatesDataSource {
    getCurrencyRates(
        currencyNames: Set<CurrencyName>,
    ): Observable<CurrencyRate[]> {
        return of([]);
    }
}
