import { CurrencyName } from '../models/currency-rate.model';

export const mockRecordCurrencyRates: Record<CurrencyName, number> = {
    RUB: 0.3,
    EUR: 0.4,
    CNY: 0.8,
    JPY: 0.5,
    TRY: 0.1,
    USD: 1,
};

export const mapCurrencyCountries: Record<
    CurrencyName,
    { iconUrl: string; countryName: string }
> = {
    RUB: {
        iconUrl: '/assets/flags/russia.png',
        countryName: 'Россия',
    },
    EUR: { iconUrl: '/assets/flags/eu.png', countryName: 'ЕС' },
    CNY: { iconUrl: '/assets/flags/china.png', countryName: 'Китай' },
    JPY: {
        iconUrl: '/assets/flags/japan.png',
        countryName: 'Япония',
    },
    TRY: {
        iconUrl: '/assets/flags/turkiye.png',
        countryName: 'Турция',
    },
    USD: { iconUrl: '/assets/flags/usa.png', countryName: 'США' },
};
