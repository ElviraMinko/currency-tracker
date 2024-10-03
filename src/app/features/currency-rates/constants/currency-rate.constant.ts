import { CurrencyName } from '../models/currency-rate.model';

export const mockRecordCurrencyRates: Record<CurrencyName, number> = {
    RUB: 90,
    EUR: 0.9,
    CNY: 0.8,
    JPY: 1.2,
    TRY: 2,
    USD: 1,
};

export const mapCurrencyCountries: Record<CurrencyName, { iconUrl: string; countryName: string }> = {
    RUB: {
        iconUrl: './assets/flags/russia.png',
        countryName: 'Россия',
    },
    EUR: { iconUrl: './assets/flags/eu.png', countryName: 'ЕС' },
    CNY: { iconUrl: './assets/flags/china.png', countryName: 'Китай' },
    JPY: {
        iconUrl: './assets/flags/japan.png',
        countryName: 'Япония',
    },
    TRY: {
        iconUrl: './assets/flags/turkiye.png',
        countryName: 'Турция',
    },
    USD: { iconUrl: './assets/flags/usa.png', countryName: 'США' },
};
