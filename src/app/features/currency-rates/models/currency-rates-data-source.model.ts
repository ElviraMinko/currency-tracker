import { Observable } from 'rxjs';
import { CurrencyName } from '../../../core/models/currency-name.model';
import { CurrencyRate } from './currency-rate.model';

export abstract class CurrencyRatesDataSource {
    abstract getCurrencyRates(currencyNames: Set<CurrencyName>): Observable<CurrencyRate[]>;
}
