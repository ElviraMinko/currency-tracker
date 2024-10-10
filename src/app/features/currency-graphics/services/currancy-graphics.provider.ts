import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { forkJoin, of } from 'rxjs';
import { CurrencyName } from './../../../core/models/currency-name.model';
import { CurrencyCoordinates } from './../models/currency-coordinates.model';
import { CurrencyGraphicsDataSource } from './../models/currency-rates-data-source.model';
import { CurrencyGraphicsState } from './currancy-graphics.state';

@Injectable()
export class CurrencyGraphicsProvider {
    actualDate = dayjs();
    previousDate = dayjs().subtract(12, 'year');

    constructor(
        private readonly httpServise: CurrencyGraphicsDataSource,
        private readonly state: CurrencyGraphicsState,
    ) {}

    getScatterDataState(graphicCurrencyName: CurrencyName, latestValueOfCurrencyRate?: number): void {
        this.state.setScatterDataState({
            status: 'loading',
            data: { rateCoordinatesX: [], rateCoordinatesY: [] },
        });
        forkJoin({
            latestValueOfCurrencyRate: latestValueOfCurrencyRate
                ? of(latestValueOfCurrencyRate)
                : this.httpServise.getCurrencyRateFromData(graphicCurrencyName, this.actualDate),
            firstValueOfCurrencyRate: this.httpServise.getCurrencyRateFromData(graphicCurrencyName, this.previousDate),
        }).subscribe({
            next: ({ latestValueOfCurrencyRate, firstValueOfCurrencyRate }) => {
                this.state.setScatterDataState({
                    status: 'success',
                    data: this.generateCurrencyRateStatistic(latestValueOfCurrencyRate, firstValueOfCurrencyRate),
                });
            },
            error: () => {
                this.state.setScatterDataState({
                    status: 'error',
                    data: { rateCoordinatesX: [], rateCoordinatesY: [] },
                });
            },
        });
    }

    private generateCurrencyRateStatistic(
        latestValueOfCurrencyRate: number,
        firstValueOfCurrencyRate: number,
    ): CurrencyCoordinates {
        const fullRatesStatistic: CurrencyCoordinates = {
            rateCoordinatesX: [],
            rateCoordinatesY: [],
        };
        const k =
            (firstValueOfCurrencyRate - latestValueOfCurrencyRate) /
            (this.previousDate.year() - this.actualDate.year());
        const b = latestValueOfCurrencyRate - k * this.actualDate.year();
        const delta = Math.max(firstValueOfCurrencyRate, latestValueOfCurrencyRate) * 0.2;
        fullRatesStatistic.rateCoordinatesX.push(this.previousDate.year());
        fullRatesStatistic.rateCoordinatesY.push(firstValueOfCurrencyRate);
        for (let i = 1; i < this.actualDate.year() - this.previousDate.year(); i++) {
            const randomY = Number(
                (k * Number(this.previousDate.year() + i) + b + this.getRandomInDeltaRange(delta)).toFixed(2),
            );
            fullRatesStatistic.rateCoordinatesX.push(this.previousDate.year() + i);
            fullRatesStatistic.rateCoordinatesY.push(randomY < 0 ? -randomY : randomY);
        }
        fullRatesStatistic.rateCoordinatesX.push(this.actualDate.year());
        fullRatesStatistic.rateCoordinatesY.push(latestValueOfCurrencyRate);
        return fullRatesStatistic;
    }

    private getRandomInDeltaRange(delta: number): number {
        return Math.random() * 2 * delta - delta;
    }
}
