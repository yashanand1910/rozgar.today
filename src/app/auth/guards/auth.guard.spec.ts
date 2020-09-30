import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NzMessageModule } from 'ng-zorro-antd/message';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NzMessageModule],
      providers: [provideMockStore()]
    });
    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
