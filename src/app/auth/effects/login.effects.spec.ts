import { LoginEffects } from './login.effects';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@env/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('LoginEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: LoginEffects;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase), RouterTestingModule, NzMessageModule],
      providers: [LoginEffects, provideMockActions(() => actions$), provideMockStore()]
    });

    effects = TestBed.inject(LoginEffects);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
