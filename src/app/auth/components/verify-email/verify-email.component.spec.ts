import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerifyEmailComponent } from '@auth/components';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthSelectors } from '@auth/selectors';

describe('VerifyEmailComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;
  let store: MockStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot(), ReactiveComponentModule, NzButtonModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [provideMockStore({ selectors: [{ selector: AuthSelectors.selectState, value: false }] })],
        declarations: [VerifyEmailComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
