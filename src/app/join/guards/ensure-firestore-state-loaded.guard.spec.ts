import { TestBed } from '@angular/core/testing';

import { EnsureFirestoreStateLoadedGuard } from './ensure-firestore-state-loaded.guard';

describe('EnsureFirestoreStateLoadedGuard', () => {
  let guard: EnsureFirestoreStateLoadedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EnsureFirestoreStateLoadedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
