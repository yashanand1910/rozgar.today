import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CollectionEffects } from './collection.effects';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@env/environment';

describe('CollectionEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: CollectionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [CollectionEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.inject(CollectionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
