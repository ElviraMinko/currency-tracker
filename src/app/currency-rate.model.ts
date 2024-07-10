export type CurrencyRate = {
    name: string;
    rate: number;
};

export type CurrencyRatesDto = {
    base: string;
    rates: { [name: string]: number };
};
