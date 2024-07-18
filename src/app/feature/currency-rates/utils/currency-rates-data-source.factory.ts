import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CurrencyRatesHttp } from '../services/currancy-rates.http';
import { CurrencyRatesMock } from '../services/currancy-rates.mock';

export function currencyRatesDataSourceFactory(
    http: HttpClient,
): CurrencyRatesMock | CurrencyRatesHttp {
    if (environment.useCurrencyMock) {
        return new CurrencyRatesMock();
    }
    return new CurrencyRatesHttp(http);
}
