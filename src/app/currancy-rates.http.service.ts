import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrencyRate } from './currency-rate.model';

@Injectable()
export class CurrancyRatesHttpService {
    readonly apiUrl =
        'https://openexchangerates.org/api/latest.json?app_id=90f7e3e0677d4de29f812687ad7f0764&base=USD&symbols=USD,GBR,EUR,RUB';

    constructor(private http: HttpClient) {}

    getCurrencyRates(): Observable<CurrencyRate[]> {
        return this.http.get(this.apiUrl).pipe(
            map((info: any) => {
                let currencyRatesList: CurrencyRate[] = [];
                for (var key in info.rates) {
                    currencyRatesList.push({
                        name: key,
                        rate: info.rates[key],
                    });
                }
                return currencyRatesList;
            }),
        );
    }
}
