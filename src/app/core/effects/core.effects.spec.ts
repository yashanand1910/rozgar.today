import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CoreEffects } from './core.effects';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@env/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { NzMessageModule } from 'ng-zorro-antd/message';

describe('CoreEffects', () => {
  // eslint-disable-next-line prefer-const
  let actions$: Observable<any>;
  let effects: CoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase), RouterTestingModule, NzMessageModule],
      providers: [CoreEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.inject(CoreEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
