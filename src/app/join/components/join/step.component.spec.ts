import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepComponent } from './step.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('StepComponent', () => {
  let component: StepComponent;
  let fixture: ComponentFixture<StepComponent>;
  let store: MockStore;
  let actions$: Actions;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, ReactiveFormsModule],
        providers: [provideMockStore(), provideMockActions(() => actions$)],
        declarations: [StepComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StepComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    actions$ = TestBed.inject(Actions);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
