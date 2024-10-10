import { Injectable } from '@angular/core';
import { Dayjs } from 'dayjs';
import { Observable, delay, of } from 'rxjs';
import { CurrencyName } from './../../../core/models/currency-name.model';
import { CurrencyGraphicsDataSource } from './../models/currency-rates-data-source.model';

@Injectable()
export class CurrencyGraphicsMock implements CurrencyGraphicsDataSource {
    getCurrencyRateFromData(currencyNames: CurrencyName, date: Dayjs): Observable<number> {
        return of(2).pipe(delay(300));
    }
}
