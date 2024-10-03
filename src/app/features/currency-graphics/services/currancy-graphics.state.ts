import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataState } from './../../../core/models/data-state.model';
import { CurrencyCoordinates } from './../models/currency-coordinates.model';

@Injectable()
export class CurrencyGraphicsState {
    private scatterDataStateSubject = new BehaviorSubject<DataState<CurrencyCoordinates>>({
        status: 'idle',
        data: { rateCoordinatesX: [], rateCoordinatesY: [] },
    });
    readonly scatterDataState$ = this.scatterDataStateSubject.asObservable();

    setScatterDataState(CurrencyCoordinatesValuesWithStatus: DataState<CurrencyCoordinates>): void {
        this.scatterDataStateSubject.next(CurrencyCoordinatesValuesWithStatus);
    }
}
