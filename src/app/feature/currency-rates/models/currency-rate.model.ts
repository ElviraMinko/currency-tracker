export type CurrencyRate = {
    name: CurrencyName;
    rate: number;
};

export type CurrencyRatesDto = {
    base: string;
    rates: { [name: string]: number };
};

export type CurrencyName = 'RUB' | 'EUR' | 'USD' | 'CNY' | 'JPY' | 'TRY';
