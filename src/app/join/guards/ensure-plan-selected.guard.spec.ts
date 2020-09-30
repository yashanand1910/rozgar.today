import { TestBed } from '@angular/core/testing';
import { EnsurePlanSelectedGuard } from './ensure-plan-selected.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NzMessageModule } from 'ng-zorro-antd/message';

describe('EnsurePlanSelectedGuard', () => {
  let guard: EnsurePlanSelectedGuard;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NzMessageModule],
      providers: [EnsurePlanSelectedGuard, provideMockStore()]
    });
    guard = TestBed.inject(EnsurePlanSelectedGuard);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
