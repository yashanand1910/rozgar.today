import { TestBed } from '@angular/core/testing';

import { EnsureAuthStateInitializedGuard } from './ensure-auth-state-initialized.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('EnsureAuthStateInitializedGuard', () => {
  let guard: EnsureAuthStateInitializedGuard;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()]
    });
    guard = TestBed.inject(EnsureAuthStateInitializedGuard);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
