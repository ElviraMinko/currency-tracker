import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
    selector: 'ct-layout',
    standalone: true,
    imports: [NzLayoutModule],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
