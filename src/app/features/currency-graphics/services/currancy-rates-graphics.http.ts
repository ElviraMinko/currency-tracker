import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrencyName } from '../../currency-rates/models/currency-rate.model';
import { CurrencyRatesDto } from './../../currency-rates/models/currency-rate.model';
import { CurrencyGraphicsDataSource } from './../models/currency-rates-data-source.model';

@Injectable()
export class CurrencyGraphicHttp implements CurrencyGraphicsDataSource {
    readonly API_TOKEN = '2fab86d1871f4f4a98f8e9344f665f24';
    readonly API_URL = `https://openexchangerates.org/api/historical/`;

    constructor(private readonly http: HttpClient) {}

    getCurrencyRateFromData(currencyNames: CurrencyName, date: dayjs.Dayjs): Observable<number> {
        return this.http
            .get<CurrencyRatesDto>(
                this.API_URL + date.format('YYYY-MM-DD') + '.json?app_id=' + this.API_TOKEN + '&base=USD',
            )
            .pipe(
                map((response) => {
                    return response.rates[currencyNames];
                }),
            );
    }
}
