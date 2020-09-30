import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { JoinEffects } from './join.effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@env/environment';

describe('JoinEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: JoinEffects;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase), RouterTestingModule],
      providers: [JoinEffects, provideMockActions(() => actions$), provideMockStore()]
    });

    effects = TestBed.inject(JoinEffects);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
