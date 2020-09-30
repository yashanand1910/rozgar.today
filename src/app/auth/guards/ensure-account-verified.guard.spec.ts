import { TestBed } from '@angular/core/testing';

import { EnsureAccountVerifiedGuard } from './ensure-account-verified.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { RouterTestingModule } from '@angular/router/testing';

describe('EnsureAccountVerifiedGuard', () => {
  let guard: EnsureAccountVerifiedGuard;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NzMessageModule, RouterTestingModule],
      providers: [provideMockStore()]
    });
    guard = TestBed.inject(EnsureAccountVerifiedGuard);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
