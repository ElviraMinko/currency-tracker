import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CurrencyGraphicsState } from './../services/currancy-graphics.state';

@Component({
    selector: 'ct-scatter',
    standalone: true,
    imports: [AsyncPipe, NzSpinModule],
    templateUrl: './scatter.component.html',
    styleUrl: './scatter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScatterComponent implements OnInit {
    @Input() currencyName: string = 'CNY';
    private rateCoordinates: number[][] = [];
    chart: any = [];
    dataState$ = this.state.scatterDataState$;

    constructor(
        private readonly state: CurrencyGraphicsState,
        private elementRef: ElementRef,
    ) {}

    ngOnInit(): void {
        this.state.scatterDataState$.subscribe((scatterDataState) => {
            this.rateCoordinates = scatterDataState.data;
            let rateCoordinatesX: number[] = [];
            let rateCoordinatesY: number[] = [];
            this.rateCoordinates.map((rate) => {
                rateCoordinatesX.push(rate[0]);
                rateCoordinatesY.push(rate[1]);
            });
            let htmlRef = this.elementRef.nativeElement.querySelector(`canvas`);
            this.chart = new Chart(htmlRef, {
                type: 'line',
                data: {
                    labels: [...rateCoordinatesX],
                    datasets: [
                        {
                            data: [...rateCoordinatesY],
                            borderWidth: 1,
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
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
}
