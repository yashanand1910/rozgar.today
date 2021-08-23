import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { StepPath } from '@app/join/models';
import { Alert, QueryParamKey } from '@core/models';
import * as JoinActions from '@app/join/actions';
import { Observable } from 'rxjs';
import * as AlertSelectors from '@core/selectors/alert.selectors';
import { Actions } from '@ngrx/effects';

@Component({
  template: ``
})
// Step super component
export class StepComponent implements OnInit {
  alert$: Observable<Alert>;

  constructor(
    protected store: Store,
    protected actions$: Actions,
    protected router: Router,
    protected formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.alert$ = this.store.select(AlertSelectors.select, { component: 'createAccount' });
  }

  changePlan() {
    this.router
      .navigate([`/join/${StepPath.Plan}`], {
        queryParams: { [QueryParamKey.ReturnUrl]: this.router.url }
      })
      .then();
  }

  previous() {
    this.store.dispatch(JoinActions.previousStep());
  }

  next(setFirestoreState: boolean = true) {
    this.store.dispatch(JoinActions.nextStep({ setFirestoreState }));
  }
}
