import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
} from '@angular/core';
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
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { AuthService } from '../../core/services/auth-service';

type LoginFormGroup = FormGroup<{
    login: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
}>;

@Component({
    selector: 'ct-login',
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
        NzTypographyModule,
        NzMessageModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    loginForm: LoginFormGroup;
    isLoading: boolean = false;

    constructor(
        private readonly router: Router,
        private readonly formBuilder: NonNullableFormBuilder,
        private readonly authService: AuthService,
        private readonly messageService: NzMessageService,
        private readonly changeDetector: ChangeDetectorRef,
    ) {
        this.loginForm = this.createLoginForm();
    }

    submitForm(): void {
        this.isLoading = true;
        if (
            this.loginForm.value.login === undefined ||
            this.loginForm.value.password === undefined ||
            this.loginForm.value.remember === undefined
        ) {
            return;
        }
        this.authService
            .login(
                this.loginForm.value.login,
                this.loginForm.value.password,
                this.loginForm.value.remember,
            )
            .subscribe({
                next: () => {
                    this.router.navigate(['/currency']);
                },
                error: () => {
                    this.isLoading = false;
                    this.createErrorMessage();
                    this.changeDetector.markForCheck();
                },
            });
    }

    createErrorMessage(): void {
        this.messageService.create(
            'error',
            'Пользователя с таким логином и паролем не существует',
        );
    }

    private createLoginForm(): LoginFormGroup {
        return this.formBuilder.group({
            login: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.minLength(4),
                ],
            ],
            password: ['', [Validators.required, Validators.minLength(4)]],
            remember: [true],
        });
    }
}
