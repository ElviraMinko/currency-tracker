import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
    selector: 'ct-app',
    standalone: true,
    imports: [RouterOutlet, NzLayoutModule, NzButtonModule],
    templateUrl: 'app.component.html',
    styleUrl: 'app.component.scss',
})
export class AppComponent {}
