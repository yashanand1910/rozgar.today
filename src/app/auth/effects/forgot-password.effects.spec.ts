import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ForgotPasswordEffects } from './forgot-password.effects';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@env/environment';

describe('ForgotPasswordEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: ForgotPasswordEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [ForgotPasswordEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.inject(ForgotPasswordEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
