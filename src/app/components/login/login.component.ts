import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: 'login.component.html',
    imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
    myForm: FormGroup;
    login: string = '';
    password: string = '';
    isLoginValid: boolean = true;
    isPasswordValid: boolean = true;
    errorLoginMessage = '';
    errorPasswordMessage = '';

    constructor(private router: Router) {
        this.myForm = new FormGroup({
            login: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        });
    }

    submit() {
        this.router.navigate(['/currency']);
    }
}
