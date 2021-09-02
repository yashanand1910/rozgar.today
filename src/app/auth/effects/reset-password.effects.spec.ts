import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ResetPasswordEffects } from './reset-password.effects';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '@env/environment';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { RouterTestingModule } from '@angular/router/testing';

describe('ResetPasswordEffects', () => {
  // eslint-disable-next-line prefer-const
  let actions$: Observable<any>;
  let effects: ResetPasswordEffects;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase), NzMessageModule, RouterTestingModule],
      providers: [ResetPasswordEffects, provideMockActions(() => actions$), provideMockStore()]
    });

    effects = TestBed.inject(ResetPasswordEffects);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
