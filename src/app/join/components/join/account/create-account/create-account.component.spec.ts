import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateAccountComponent } from '@app/join/components/join';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SharedModule } from '@shared';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@env/environment';
import { selectAlerts } from '@core/selectors';
import { selectSignupState } from '@auth/selectors';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;
  let store: MockStore;
  let actions$: Actions;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          NzGridModule,
          TranslateModule.forRoot(),
          ReactiveComponentModule,
          ReactiveFormsModule,
          NzFormModule,
          NzIconModule,
          SharedModule,
          NzButtonModule,
          RouterTestingModule,
          AngularFireModule.initializeApp(environment.firebase)
        ],
        providers: [
          provideMockStore({
            selectors: [
              {
                selector: selectAlerts,
                value: false
              },
              {
                selector: selectSignupState,
                value: false
              }
            ]
          }),
          provideMockActions(() => actions$)
        ],
        declarations: [CreateAccountComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    actions$ = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
