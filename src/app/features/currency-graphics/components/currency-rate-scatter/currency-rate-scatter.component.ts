import { AsyncPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoModule } from '@jsverse/transloco';
import { Chart } from 'chart.js/auto';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CurrencyName } from '../../../../core/models/currency-name.model';
import { DataState } from '../../../../core/models/data-state.model';
import { CurrencyGraphicsState } from '../../services/currancy-graphics.state';
import { CurrencyCoordinates } from './../../models/currency-coordinates.model';

@Component({
    selector: 'ct-currency-rate-scatter',
    standalone: true,
    imports: [AsyncPipe, NzSpinModule, NzResultModule, TranslocoModule],
    templateUrl: './currency-rate-scatter.component.html',
    styleUrl: './currency-rate-scatter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyRateScatterComponent implements OnInit, OnDestroy {
    @Input({ required: true }) currencyName: CurrencyName | null = null;
    @ViewChild('canvas') canvas: ElementRef | null = null;

    chart: Chart | null = null;
    dataState: DataState<CurrencyCoordinates> | null = null;
    private readonly pinkColorForGraphic = 'rgb(255, 99, 132)';

    constructor(
        private readonly state: CurrencyGraphicsState,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly destroyRef: DestroyRef,
    ) {}

    ngOnInit(): void {
        this.state.scatterDataState$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((scatterDataState) => {
            this.dataState = scatterDataState;
            this.changeDetectorRef.detectChanges();
            if (scatterDataState.status !== 'success' || !this.canvas) {
                return;
            }
            const htmlRef = this.canvas.nativeElement;
            this.chart = new Chart(htmlRef, {
                type: 'line',
                data: {
                    labels: scatterDataState.data.rateCoordinatesX,
                    datasets: [
                        {
                            data: scatterDataState.data.rateCoordinatesY,
                            borderWidth: 1,
                            backgroundColor: this.pinkColorForGraphic,
                            borderColor: this.pinkColorForGraphic,
                            fill: false,
                            tension: 0.1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                },
            });
        });
    }

    ngOnDestroy() {
        this.chart?.destroy();
    }
}
