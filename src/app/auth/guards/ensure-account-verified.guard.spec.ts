import { TestBed } from '@angular/core/testing';

import { EnsureAccountVerifiedGuard } from './ensure-account-verified.guard';

describe('EnsureAccountVerifiedGuard', () => {
  let guard: EnsureAccountVerifiedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EnsureAccountVerifiedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
