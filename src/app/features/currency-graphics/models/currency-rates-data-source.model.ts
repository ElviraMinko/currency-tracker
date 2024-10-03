import { Dayjs } from 'dayjs';
import { Observable } from 'rxjs';
import { CurrencyName } from './../../../core/models/currency-name.model';

export abstract class CurrencyGraphicsDataSource {
    abstract getCurrencyRateFromData(currencyNames: CurrencyName, data: Dayjs): Observable<number>;
}
