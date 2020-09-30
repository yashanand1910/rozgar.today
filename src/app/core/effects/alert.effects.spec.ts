import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AlertEffects } from './alert.effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@env/environment';

describe('AlertEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: AlertEffects;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [AlertEffects, provideMockActions(() => actions$), provideMockStore()]
    });

    effects = TestBed.inject(AlertEffects);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
