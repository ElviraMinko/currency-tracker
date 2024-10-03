import dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { CurrencyName } from './../../currency-rates/models/currency-rate.model';

export abstract class CurrencyGraphicsDataSource {
    abstract getCurrencyRateFromData(currencyNames: CurrencyName, data: dayjs.Dayjs): Observable<number>;
}
