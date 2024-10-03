import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { forkJoin, of } from 'rxjs';
import { CurrencyName } from '../../currency-rates/models/currency-rate.model';
import { CurrencyGraphicsDataSource } from './../models/currency-rates-data-source.model';
import { CurrencyGraphicsState } from './currancy-graphics.state';

@Injectable()
export class CurrencyGraphicsProvider {
    actualData = dayjs();
    previousData = dayjs().subtract(12, 'year');

    constructor(
        private readonly httpServise: CurrencyGraphicsDataSource,
        private readonly state: CurrencyGraphicsState,
    ) {}

    getScatterDataState(graphicCurrencyName: CurrencyName, lastValue?: number): void {
        this.state.setScatterDataState({
            status: 'loading',
            data: [],
        });
        forkJoin({
            lastValue: lastValue
                ? of(lastValue)
                : this.httpServise.getCurrencyRateFromData(graphicCurrencyName, this.actualData),
            firstValue: this.httpServise.getCurrencyRateFromData(graphicCurrencyName, this.previousData),
        }).subscribe(({ lastValue, firstValue }) => {
            this.setScatterDataState(lastValue, firstValue);
        });
    }

    setScatterDataState(lastValue: number, firstValue: number): void {
        this.state.setScatterDataState({
            status: 'success',
            data: this.generateCurrencyRateStatistic(lastValue, firstValue),
        });
    }

    generateCurrencyRateStatistic(lastValue: number, firstValue: number): number[][] {
        let fullRatesStatistic: number[][] = [];
        const k = (firstValue - lastValue) / (this.previousData.year() - this.actualData.year());
        const b = lastValue - k * this.actualData.year();
        const delta = Math.max(firstValue, lastValue) * 0.2;
        fullRatesStatistic.push([this.previousData.year(), firstValue]);
        for (let i = 1; i < this.actualData.year() - this.previousData.year(); i++) {
            let randomY = Number((k * Number(this.previousData.year() + i) + b + this.random(delta)).toFixed(2));
            fullRatesStatistic.push([this.previousData.year() + i, randomY < 0 ? -randomY : randomY]);
        }
        fullRatesStatistic.push([this.actualData.year(), lastValue]);
        return fullRatesStatistic;
    }

    random(delta: number): number {
        return Math.random() * 2 * delta - delta;
    }
}
