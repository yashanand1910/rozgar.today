import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CoreSelectors from '@core/selectors';
import { CustomValidators } from '@shared/validators';
import { untilDestroyed } from '@core/utils';
import * as SignupSelectors from '@auth/selectors';
import * as JoinActions from '@app/join/actions';
import * as AuthActions from '@auth/actions';
import { Alert, Collection, Reference } from '@core/models';
import { tap } from 'rxjs/operators';
import { Constraint } from '@core/models/constraint';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.less', '../../join.component.less']
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  passwordVisible: boolean;
  signupForm!: FormGroup;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  constraintsIsLoading$: Observable<boolean>;
  _countries: Reference = {
    collection: Collection.Countries
  };
  _cities: Reference = {
    collection: Collection.Cities
  };
  lastSalaryConstraint$: Observable<Constraint>;
  alert$: Observable<Alert>;

  constructor(private store: Store, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.signupForm.controls.password.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
      this.signupForm.controls.confirmPassword.updateValueAndValidity();
    });

    this.error$ = this.store.select(SignupSelectors.selectSignupError);
    this.isLoading$ = this.store.select(SignupSelectors.selectSignupIsLoading);
    this.alert$ = this.store.select(CoreSelectors.selectAlert, { component: 'createAccount' });
    this.constraintsIsLoading$ = this.store.select(CoreSelectors.selectConstraintsIsLoading);
    this.lastSalaryConstraint$ = this.store.select(CoreSelectors.selectConstraint, { name: 'lastSalary' }).pipe(
      tap((constraint) => {
        if (constraint) {
          return this.signupForm.controls.lastSalary.setValidators([
            CustomValidators.required,
            CustomValidators.max(constraint.max ? constraint.max : 999)
          ]);
        }
      })
    );
  }

  ngOnDestroy() {}

  back() {
    this.store.dispatch(JoinActions.previousJoinStep());
  }

  clearError() {
    this.store.dispatch(AuthActions.clearSignupError());
  }

  submit(): void {
    for (const key in this.signupForm.controls) {
      if (key) {
        this.signupForm.controls[key].markAsDirty();
        this.signupForm.controls[key].updateValueAndValidity();
      }
    }

    this.store.dispatch(AuthActions.signUp({ context: this.signupForm.value }));
  }

  private createForm() {
    this.signupForm = this.formBuilder.group({
      firstName: [null, [CustomValidators.required]],
      lastName: [null, [CustomValidators.required]],
      email: [null, [CustomValidators.required, CustomValidators.email]],
      phoneNumberPrefix: ['+91'],
      phoneNumber: [null, [CustomValidators.required, CustomValidators.phoneNumber]],
      lastSalary: [null],
      country: [null, [CustomValidators.required]],
      preferredCities: [null, [CustomValidators.required]],
      password: [null, [CustomValidators.required, CustomValidators.minLength(6)]],
      confirmPassword: [null, [CustomValidators.required, this.confirmPasswordValidator]]
    });
  }

  private confirmPasswordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.signupForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}