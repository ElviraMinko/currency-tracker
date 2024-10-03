import { Observable } from 'rxjs';
import { CurrencyName, CurrencyRate } from './currency-rate.model';

export abstract class CurrencyRatesDataSource {
    abstract getCurrencyRates(
        currencyNames: Set<CurrencyName>,
    ): Observable<CurrencyRate[]>;
}
