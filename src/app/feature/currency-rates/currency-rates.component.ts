import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { filter, interval } from 'rxjs';
import { CurrenceSelectModalComponent } from './components/currency-select-modal/currency-select-modal.component';
import { CurrencyName, CurrencyRate } from './models/currency-rate.model';
import { CurrencyRatesDataSource } from './models/currency-rates-data-source.model';
import { CurrencyRatesProvider } from './services/currancy-rates.provider';
import { CurrencyRatesState } from './services/currancy-rates.state';
import { currencyRatesDataSourceFactory } from './utils/currency-rates-data-source.factory';

@Component({
    selector: 'app-currency',
    standalone: true,
    imports: [
        CommonModule,
        DecimalPipe,
        AsyncPipe,
        NzListModule,
        NzModalModule,
        NzButtonModule,
        CurrenceSelectModalComponent,
        NzSpinModule,
        NzEmptyModule,
    ],
    templateUrl: 'currency-rates.component.html',
    styleUrl: './currency-rates.component.scss',
    providers: [
        CurrencyRatesProvider,
        CurrencyRatesState,
        {
            provide: CurrencyRatesDataSource,
            useFactory: currencyRatesDataSourceFactory,
            deps: [HttpClient],
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyRatesComponent implements OnInit {
    actualDateAndTime: Date = new Date();
    isSelectedCurrencyNamesSetEmpty$ =
        this.provider.isSelectedCurrencyNamesSetEmpty$;
    isOptionalCurrencyNamesSetEmpty$ =
        this.provider.isOptionalCurrencyNamesSetEmpty$;
    readonly currencyDescription$ = this.provider.currencyDescription$;
    readonly optionalCurrencyNames$ = this.provider.optionalCurrencyNames$;

    constructor(
        private readonly provider: CurrencyRatesProvider,
        private readonly changeDetector: ChangeDetectorRef,
        private readonly destroyRef: DestroyRef,
        private readonly nzModalService: NzModalService,
    ) {}

    ngOnInit(): void {
        this.runTimeUpdateProcessByRxJs();
    }

    deleteCurrencyRate(currency: CurrencyRate): void {
        this.provider.deleteCurrencyRate(currency.name);
    }

    runTimeUpdateProcessByRxJs(): void {
        interval(1000)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.actualDateAndTime = new Date();
                this.changeDetector.markForCheck();
            });
    }

    openCurrencySelectModal(): void {
        this.nzModalService
            .create<
                CurrenceSelectModalComponent,
                Set<CurrencyName>,
                CurrencyName[]
            >({
                nzTitle: 'Выбор валют',
                nzContent: CurrenceSelectModalComponent,
                nzData: this.provider.getOptionalCurrencyNames(),
                nzFooter: null,
                nzWidth: 300,
            })
            .afterClose.pipe(
                filter((result): result is CurrencyName[] => !!result),
            )
            .subscribe((result) => {
                this.provider.addCurrencyRate(result);
            });
    }
}
