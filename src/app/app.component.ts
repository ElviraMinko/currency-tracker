import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { avalibleLangs } from './core/constansts/i18n.constant';

@Component({
    selector: 'ct-app',
    standalone: true,
    imports: [RouterOutlet, NzLayoutModule, NzButtonModule, TranslocoModule, AsyncPipe, NgIf],
    templateUrl: 'app.component.html',
    styleUrl: 'app.component.scss',
})
export class AppComponent {
    activeLanguage$ = this.translocoService.langChanges$;
    avalibleLangs = avalibleLangs;

    constructor(private readonly translocoService: TranslocoService) {}

    switchLanguage(lang: string) {
        this.translocoService.setActiveLang(lang);
    }
}
