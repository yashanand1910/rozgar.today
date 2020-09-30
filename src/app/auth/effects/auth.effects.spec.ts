import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AuthEffects } from './auth.effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@env/environment';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase), NzMessageModule, RouterTestingModule],
      providers: [AuthEffects, provideMockActions(() => actions$), provideMockStore()]
    });

    effects = TestBed.inject(AuthEffects);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
