import { TestBed } from '@angular/core/testing';

import { EnsurePreviousStepsGuard } from './ensure-previous-steps.guard';

describe('EnsurePreviousStepsGuard', () => {
  let guard: EnsurePreviousStepsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EnsurePreviousStepsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
