import { TestBed } from '@angular/core/testing';
import { EnsureFirestoreStateUpdatedGuard } from './ensure-firestore-state-updated.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';

describe('EnsureFirestoreStateLoadedGuard', () => {
  let guard: EnsureFirestoreStateUpdatedGuard;
  let store: MockStore;
  let actions$: Actions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnsureFirestoreStateUpdatedGuard, provideMockStore(), provideMockActions(() => actions$)]
    });
    guard = TestBed.inject(EnsureFirestoreStateUpdatedGuard);
    store = TestBed.inject(MockStore);
    actions$ = TestBed.inject(Actions);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
