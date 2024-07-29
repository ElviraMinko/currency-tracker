import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { filter } from 'rxjs';
import { LayoutComponent } from '../../core/components/layout/layout.component';
import { AuthService } from '../../core/services/auth-service';
import { CurrenceSelectModalComponent } from './components/currency-select-modal/currency-select-modal.component';
import { CurrencyName, CurrencyRate } from './models/currency-rate.model';
import { CurrencyRatesDataSource } from './models/currency-rates-data-source.model';
import { CurrencyRatesProvider } from './services/currancy-rates.provider';
import { CurrencyRatesState } from './services/currancy-rates.state';
import { currencyRatesDataSourceFactory } from './utils/currency-rates-data-source.factory';

@Component({
    selector: 'ct-currency',
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
        LayoutComponent,
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
export class CurrencyRatesComponent {
    readonly isSelectedCurrencyNamesSetEmpty$ =
        this.provider.isSelectedCurrencyNamesSetEmpty$;
    readonly isOptionalCurrencyNamesSetEmpty$ =
        this.provider.isOptionalCurrencyNamesSetEmpty$;
    readonly currencyDescription$ = this.provider.currencyDescription$;
    readonly optionalCurrencyNames$ = this.provider.optionalCurrencyNames$;

    constructor(
        private readonly authService: AuthService,
        private readonly provider: CurrencyRatesProvider,
        private readonly nzModalService: NzModalService,
    ) {}

    deleteCurrencyRate(currency: CurrencyRate): void {
        this.provider.deleteCurrencyRate(currency.name);
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

    logout(): void {
        this.authService.logout();
    }
}
