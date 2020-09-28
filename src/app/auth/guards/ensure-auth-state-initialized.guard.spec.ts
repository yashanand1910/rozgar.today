import { TestBed } from '@angular/core/testing';

import { EnsureAuthStateInitializedGuard } from './ensure-auth-state-initialized.guard';

describe('EnsureAuthStateInitializedGuard', () => {
  let guard: EnsureAuthStateInitializedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EnsureAuthStateInitializedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
