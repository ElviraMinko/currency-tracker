import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing'; // 1
import { TRANSLOCO_LOADER, TranslocoLoader, TranslocoService, TranslocoTestingModule } from '@jsverse/transloco';
import { LayoutComponent } from '../../core/components/layout/layout.component';
import { LoginComponent } from './login.component';

class MockTranslocoService {
    reRenderOnLangChange = true;
    selectTranslate(key: string) {
        return key; // Можете здесь имитировать возврат переводов
    }

    config = {
        availableLangs: ['en', 'ru'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
    };
}

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let translocoService: TranslocoService;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                LoginComponent,
                LayoutComponent,
                TranslocoTestingModule.forRoot({
                    langs: {
                        en,
                        ru,
                    },
                    translocoConfig: {
                        availableLangs: ['en', 'ru'],
                        defaultLang: 'en',
                        reRenderOnLangChange: true,
                    },
                    preloadLangs: true,
                }),
            ],
            providers: [
                { provide: TranslocoService, useClass: MockTranslocoService },
                { provide: TRANSLOCO_LOADER, useClass: CustomTranslocoLoader },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        translocoService = TestBed.inject(TranslocoService);

        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    // it(`should have as title 'angular-component-testing'`, () => {
    //     //5
    //     const fixture = TestBed.createComponent(LoginComponent);
    //     const app = fixture.debugElement.componentInstance;
    //     expect(app.title).toEqual('angular-component-testing');
    // });
});
@Injectable()
export class CustomTranslocoLoader implements TranslocoLoader {
    constructor(private http: HttpClient) {}

    getTranslation(lang: string) {
        // Replace this with your custom logic to fetch translations
        return this.http.get(`./assets/i18n/${lang}.json`);
    }
}

const en = {
    login: {
        loginComponent: {
            pageTitle: 'Enter',
            rememberCheckbox: 'Remember me',
            placeholderLogin: 'login',
            placeholderPassword: 'password',
            enterButtonLabel: 'Enter',
            loginError: 'Invalid email format',
            passwordError: 'Invalid password format',
        },
    },

    currencyRate: {
        currencyRateComponent: {
            pageTitle: 'Currency Rates',
            logoutLinkLabel: 'Logout',
            emptyCurrencyLabel: 'Choose currencies',
            deleteButtonLabel: 'Delete',
            addCurrencyButtonLabel: 'Add currencies',
        },

        currencySelectModal: {
            addButtonModalLabel: 'Add',
            modalTitle: 'Choose currencies',
        },
    },

    footer: {
        developerLabel: 'Developer - Minko Elvira',
    },
};
const ru = {
    login: {
        loginComponent: {
            pageTitle: 'Вход',
            rememberCheckbox: 'Запомнить меня',
            placeholderLogin: 'Логин',
            placeholderPassword: 'пароль',
            enterButtonLabel: 'Войти',
            loginError: 'Неправильный формат почты',
            passwordError: 'Неправильный формат пароля',
        },
    },

    currencyRate: {
        currencyRateComponent: {
            pageTitle: 'Курсы валют',
            logoutLinkLabel: 'Выйти',
            emptyCurrencyLabel: 'Выберете валюту',
            deleteButtonLabel: 'Удалить',
            addCurrencyButtonLabel: 'Добавьте валюту',
        },

        currencySelectModal: {
            addButtonModalLabel: 'Добавить',
            modalTitle: 'Выбор валют',
        },
    },

    footer: {
        developerLabel: 'Создатель - Эльвира Минько',
    },
};
