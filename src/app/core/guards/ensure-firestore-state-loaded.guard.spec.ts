import { TestBed } from '@angular/core/testing';
import { EnsureFirestoreStateLoadedGuard } from './ensure-firestore-state-loaded.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';

describe('EnsureFirestoreStateLoadedGuard', () => {
  let guard: EnsureFirestoreStateLoadedGuard;
  let store: MockStore;
  let actions$: Actions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnsureFirestoreStateLoadedGuard, provideMockStore(), provideMockActions(() => actions$)]
    });
    guard = TestBed.inject(EnsureFirestoreStateLoadedGuard);
    store = TestBed.inject(MockStore);
    actions$ = TestBed.inject(Actions);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
