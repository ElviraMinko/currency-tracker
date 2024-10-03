import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { Observable, delay, of } from 'rxjs';
import { CurrencyName } from '../../currency-rates/models/currency-rate.model';
import { CurrencyGraphicsDataSource } from './../models/currency-rates-data-source.model';

@Injectable()
export class CurrencyGraphicsMock implements CurrencyGraphicsDataSource {
    getCurrencyRateFromData(currencyNames: CurrencyName, date: dayjs.Dayjs): Observable<number> {
        return of(2).pipe(delay(300));
    }
}
