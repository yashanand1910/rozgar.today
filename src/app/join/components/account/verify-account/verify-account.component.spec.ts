import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { VerifyAccountComponent } from '@app/join/components';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthSelectors } from '@auth/selectors';

describe('VerifyAccountComponent', () => {
  let component: VerifyAccountComponent;
  let fixture: ComponentFixture<VerifyAccountComponent>;
  let store: MockStore;
  let actions$: Actions;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ReactiveComponentModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: AuthSelectors.selectAdditionalState,
              value: false
            }
          ]
        }),
        provideMockActions(() => actions$)
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [VerifyAccountComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyAccountComponent);
    component = fixture.componentInstance;
    actions$ = TestBed.inject(Actions);
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
