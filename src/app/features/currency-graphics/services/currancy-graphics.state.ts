import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataState } from './../../../core/models/data-state.model';

@Injectable()
export class CurrencyGraphicsState {
    private scatterDataStateSubject = new BehaviorSubject<DataState<number[][]>>({
        status: 'idle',
        data: [],
    });
    readonly scatterDataState$ = this.scatterDataStateSubject.asObservable();

    setScatterDataState(CurrencyCoordinatesValuesWithStatus: DataState<number[][]>): void {
        this.scatterDataStateSubject.next(CurrencyCoordinatesValuesWithStatus);
    }
}
