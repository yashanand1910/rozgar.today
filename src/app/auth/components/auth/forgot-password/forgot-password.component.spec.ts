import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ForgotPasswordComponent } from '@auth/components/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveComponentModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectForgotPasswordState } from '@auth/selectors';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let store: MockStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          TranslateModule.forRoot(),
          ReactiveFormsModule,
          NzFormModule,
          ReactiveComponentModule,
          NzButtonModule,
          NzIconModule
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [provideMockStore({ selectors: [{ selector: selectForgotPasswordState, value: false }] })],
        declarations: [ForgotPasswordComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
