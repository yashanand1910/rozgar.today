import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { VerifyEmailEffects } from './verify-email.effects';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@env/environment';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('VerifyEmailEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: VerifyEmailEffects;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [VerifyEmailEffects, provideMockActions(() => actions$), provideMockStore()]
    });

    effects = TestBed.inject(VerifyEmailEffects);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
