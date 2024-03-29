import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JoinComponent } from './join.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JoinSelectors } from '@app/join/selectors';

describe('JoinComponent', () => {
  let component: JoinComponent;
  let fixture: ComponentFixture<JoinComponent>;
  let store: MockStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveComponentModule, RouterTestingModule],
        providers: [
          provideMockStore({
            selectors: [
              {
                selector: JoinSelectors.selectAdditionalState,
                value: false
              },
              {
                selector: JoinSelectors.selectCurrentStepNumber,
                value: false
              }
            ]
          })
        ],
        declarations: [JoinComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
