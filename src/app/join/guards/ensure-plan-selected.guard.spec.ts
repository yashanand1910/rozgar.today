import { TestBed } from '@angular/core/testing';

import { EnsurePlanSelectedGuard } from './ensure-plan-selected.guard';

describe('EnsurePlanSelectedGuard', () => {
  let guard: EnsurePlanSelectedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EnsurePlanSelectedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
