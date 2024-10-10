import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isLoggedIn: boolean = this.initializeIsLoggedIn();

    constructor(private readonly router: Router) {}

    login(login: string, password: string, remember: boolean): Observable<void> {
        return new Observable<void>((subscriber) => {
            if (login === '123@com' && password === 'admin1') {
                this.setIsLoggedIn(true, remember);
                subscriber.next();
            } else {
                subscriber.error();
            }
            subscriber.complete();
        }).pipe(delay(1000));
    }

    getIsLoggedIn(): boolean {
        return this.isLoggedIn;
    }

    logout(): void {
        this.setIsLoggedIn(false);
        this.router.navigate(['/login']);
    }

    private initializeIsLoggedIn(): boolean {
        return Boolean(localStorage.getItem('isLoggedIn'));
    }

    private setIsLoggedIn(isLoggedIn: boolean, remember?: boolean): void {
        this.isLoggedIn = isLoggedIn;
        localStorage.removeItem('isLoggedIn');
        if (!isLoggedIn) {
            return;
        }
        if (remember) {
            localStorage.setItem('isLoggedIn', 'true');
            return;
        }
    }
}
