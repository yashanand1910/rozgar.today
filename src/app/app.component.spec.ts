import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { CoreModule } from '@core';
import { AppComponent } from './app.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ReactiveComponentModule } from '@ngrx/component';

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
        imports: [RouterTestingModule, CoreModule, NzSpinModule, ReactiveComponentModule],
        declarations: [AppComponent],
        providers: [
          { provide: Keyboard, useValue: keyboardSpy },
          { provide: StatusBar, useValue: statusBarSpy },
          { provide: SplashScreen, useValue: splashScreenSpy }
        ]
      }).compileComponents();
    })
  );

  it(
    'should create the app',
    waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }),
    30000
  );
});
