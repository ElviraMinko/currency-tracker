import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

type LoginFormGroup = FormGroup<{
    login: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
}>;

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: 'login.component.html',
    styleUrl: './login.component.scss',
    imports: [
        ReactiveFormsModule,
        NzButtonModule,
        NzLayoutModule,
        NzFormModule,
        NzCheckboxModule,
        NzInputModule,
        NzGridModule,
        NzIconModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    loginForm: LoginFormGroup;

    constructor(
        private readonly router: Router,
        private readonly formBuilder: NonNullableFormBuilder,
    ) {
        this.loginForm = this.createLoginForm();
    }

    submitForm(): void {
        if (this.loginForm.valid) {
            this.router.navigate(['/currency']);
            return;
        }
    }

    private createLoginForm(): LoginFormGroup {
        return this.formBuilder.group({
            login: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            remember: [true],
        });
    }
}
