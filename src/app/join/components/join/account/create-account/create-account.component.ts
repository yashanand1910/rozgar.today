import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';
import * as ConstraintSelectors from '@core/selectors/constraint.selectors';
import { CustomValidators } from '@shared/validators';
import { untilDestroyed } from '@core/utils';
import * as SignupSelectors from '@auth/selectors';
import * as AuthActions from '@auth/actions';
import { City, Collection, Country, QueryParamKey, Reference } from '@core/models';
import { StepComponent } from '../../step.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.less', '../../join.component.less']
})
export class CreateAccountComponent extends StepComponent implements OnInit, OnDestroy {
  passwordVisible: boolean;
  signupForm!: FormGroup;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  _countries: Reference<Country> = {
    collection: Collection.Countries
  };
  _cities: Reference<City> = {
    collection: Collection.Cities
  };

  ngOnInit() {
    super.ngOnInit();

    this.createForm();
    this.signupForm.controls.password.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
      this.signupForm.controls.confirmPassword.updateValueAndValidity();
    });

    this.error$ = this.store.select(SignupSelectors.selectError);
    this.isLoading$ = this.store.select(SignupSelectors.selectIsLoading);
    this.store
      .pipe(select(ConstraintSelectors.select, { name: 'lastSalary' }), untilDestroyed(this))
      .subscribe((constraint) => {
        if (constraint) {
          return this.signupForm.controls.lastSalary.setValidators([
            CustomValidators.required,
            CustomValidators.max(constraint.max ? constraint.max : 999)
          ]);
        }
      });
  }

  ngOnDestroy() {}

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

  goToLogin() {
    this.router.navigate(['/auth'], { queryParams: { [QueryParamKey.ReturnUrl]: this.router.url } }).then();
  }

  private createForm() {
    this.signupForm = this.formBuilder.group({
      firstName: [null, [CustomValidators.required]],
      lastName: [null, [CustomValidators.required]],
      email: [null, [CustomValidators.required, CustomValidators.email]],
      phoneCode: ['+91'],
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

  // TODO password strength validator
  // TODO fix browser detecting phone field as username field
}
