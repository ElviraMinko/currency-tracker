import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrencyName } from '../../../core/models/currency-name.model';
import { CurrencyRate, CurrencyRatesDto } from '../models/currency-rate.model';
import { CurrencyRatesDataSource } from '../models/currency-rates-data-source.model';

@Injectable()
export class CurrencyRatesHttp implements CurrencyRatesDataSource {
    readonly API_TOKEN = '2fab86d1871f4f4a98f8e9344f665f24';
    readonly API_BASE_CURRENCY: CurrencyName = 'USD';
    readonly API_URL = `https://openexchangerates.org/api/latest.json?app_id=${this.API_TOKEN}&base=${this.API_BASE_CURRENCY}&symbols=`;

    constructor(private readonly http: HttpClient) {}

    getCurrencyRates(currencyNames: Set<CurrencyName>): Observable<CurrencyRate[]> {
        return this.http.get<CurrencyRatesDto>(this.API_URL + [...currencyNames].join()).pipe(
            map((response) => {
                let currencyRatesList: CurrencyRate[] = [];
                for (var key in response.rates) {
                    currencyRatesList.push({
                        name: key as CurrencyName,
                        rate: response.rates[key],
                    });
                }
                return currencyRatesList;
            }),
        );
    }
}
