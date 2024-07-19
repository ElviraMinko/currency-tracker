import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [RouterOutlet, NzLayoutModule],
    templateUrl: 'app.component.html',
    styleUrl: 'app.component.scss',
})
export class AppComponent {}
