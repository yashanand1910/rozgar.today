import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SignupEffects } from './signup.effects';

describe('SignupEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: SignupEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignupEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.inject(SignupEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
