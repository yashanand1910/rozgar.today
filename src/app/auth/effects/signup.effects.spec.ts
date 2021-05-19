import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SignupEffects } from './signup.effects';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@env/environment';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { TranslateModule } from '@ngx-translate/core';

describe('SignupEffects', () => {
  // eslint-disable-next-line prefer-const
  let actions$: Observable<any>;
  let effects: SignupEffects;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase), NzMessageModule, TranslateModule.forRoot()],
      providers: [SignupEffects, provideMockActions(() => actions$), provideMockStore()]
    });

    effects = TestBed.inject(SignupEffects);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
