import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlansComponent } from './plans.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { entitySelectors, selectState } from '@core/selectors/collection.selectors';
import { Collection } from '@core/models';
import { Plan } from '@app/join/models';
import { JoinSelectors } from '@app/join/selectors';

describe('PlansComponent', () => {
  let component: PlansComponent;
  let fixture: ComponentFixture<PlansComponent>;
  let store: MockStore;
  let actions$: Actions;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, ReactiveComponentModule, NzGridModule, NzButtonModule, ReactiveFormsModule],
        providers: [
          provideMockStore({
            selectors: [
              {
                selector: selectState<Plan>(Collection.Plans),
                value: false
              },
              {
                selector: entitySelectors<Plan>(Collection.Plans).selectAll.toString(),
                value: false
              },
              {
                selector: JoinSelectors.selectAdditionalState,
                value: false
              }
            ]
          }),
          provideMockActions(() => actions$)
        ],
        declarations: [PlansComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    actions$ = TestBed.inject(Actions);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
