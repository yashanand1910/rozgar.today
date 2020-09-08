import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { JoinEffects } from './join.effects';

describe('JoinEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: JoinEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JoinEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.inject(JoinEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
