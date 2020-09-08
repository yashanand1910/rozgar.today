import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PlanEffects } from './plan.effects';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@env/environment';

describe('PlanEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: PlanEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [PlanEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.inject(PlanEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
