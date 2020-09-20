import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CollectionEffects } from './collection.effects';

describe('CollectionEffects', () => {
  const actions$: Observable<any>;
  let effects: CollectionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.inject(CollectionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
