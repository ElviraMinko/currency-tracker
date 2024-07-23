import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { CurrencyName } from '../../models/currency-rate.model';

@Component({
    standalone: true,
    templateUrl: 'currency-select-modal.component.html',
    styleUrl: './currency-select-modal.component.scss',
    imports: [
        NzCheckboxModule,
        NgFor,
        AsyncPipe,
        NzModalModule,
        NzButtonComponent,
        NzGridModule,
    ],
})
export class CurrenceSelectModalComponent {
    tickedCurrencyNames: CurrencyName[] = [];

    constructor(
        @Inject(NZ_MODAL_DATA) readonly data: Set<CurrencyName>,
        private readonly nzModalRef: NzModalRef<
            CurrenceSelectModalComponent,
            Set<CurrencyName>
        >,
    ) {}

    closeModal(): void {
        this.nzModalRef.close(new Set<CurrencyName>(this.tickedCurrencyNames));
    }

    updateTickedCurrencyNames(value: CurrencyName[]): void {
        this.tickedCurrencyNames = value;
    }
}
