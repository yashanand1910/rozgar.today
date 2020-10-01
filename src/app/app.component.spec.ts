import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppComponent } from './app.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ReactiveComponentModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let statusBarSpy: any;
  let splashScreenSpy: any;
  let keyboardSpy: any;

  beforeEach(
    waitForAsync(() => {
      statusBarSpy = jest.fn();
      splashScreenSpy = {
        hide: jest.fn()
      };
      keyboardSpy = {
        hideFormAccessoryBar: jest.fn()
      };

      TestBed.configureTestingModule({
        imports: [RouterTestingModule, ReactiveComponentModule, TranslateModule.forRoot()],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [AppComponent],
        providers: [
          { provide: Keyboard, useValue: keyboardSpy },
          { provide: StatusBar, useValue: statusBarSpy },
          { provide: SplashScreen, useValue: splashScreenSpy },
          provideMockStore()
        ]
      }).compileComponents();
    })
  );

  it(
    'should create the app',
    waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      const store = TestBed.inject(MockStore);
      expect(app).toBeTruthy();
    }),
    30000
  );
});
