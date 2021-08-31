import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ConstraintEffects } from './constraint.effects';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '@env/environment';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('ConstraintEffects', () => {
  // eslint-disable-next-line prefer-const
  let actions$: Observable<any>;
  let effects: ConstraintEffects;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [ConstraintEffects, provideMockActions(() => actions$), provideMockStore()]
    });

    effects = TestBed.inject(ConstraintEffects);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
