import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthSelectors } from '@auth/selectors';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveComponentModule],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: AuthSelectors.selectAdditionalState,
              value: false
            },
            {
              selector: AuthSelectors.selectState,
              value: false
            }
          ]
        })
      ],
      declarations: [AccountComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
