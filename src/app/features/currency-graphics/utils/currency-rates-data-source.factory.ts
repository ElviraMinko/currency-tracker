import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CurrencyGraphicsDataSource } from '../models/currency-rates-data-source.model';
import { CurrencyGraphicsMock } from '../services/currancy-rates-graphics.mock';
import { CurrencyGraphicHttp } from './../services/currancy-rates-graphics.http';

export function currencyGraphicsDataSourceFactory(http: HttpClient): CurrencyGraphicsDataSource {
    if (environment.useCurrencyMock) {
        return new CurrencyGraphicsMock();
    }
    return new CurrencyGraphicHttp(http);
}
