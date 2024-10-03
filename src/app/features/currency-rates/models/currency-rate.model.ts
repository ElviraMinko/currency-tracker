import { CurrencyName } from '../../../core/models/currency-name.model';
export type CurrencyRate = {
    name: CurrencyName;
    rate: number;
};

export type CurrencyDescription = {
    iconUrl: string;
    countryName: string;
} & CurrencyRate;

export type CurrencyRatesDto = {
    base: string;
    rates: { [name: string]: number };
};
