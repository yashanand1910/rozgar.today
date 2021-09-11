import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';
import { CustomValidators } from '@shared/validators';
import { untilDestroyed } from '@core/utils';
import { SignupSelectors } from '@auth/selectors';
import { SignupActions } from '@auth/actions';
import { City, Collection, Country, QueryParamKey, Reference } from '@core/models';
import { StepComponent } from '../../step.component';
import firebase from 'firebase/compat/app';
import FirebaseError = firebase.FirebaseError;
import { CoreSelectors } from '@core/selectors';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.less', '../../join.component.less']
})
export class CreateAccountComponent extends StepComponent implements OnInit, OnDestroy {
  passwordVisible: boolean;
  signupForm!: FormGroup;
  error$: Observable<FirebaseError>;
  isLoading$: Observable<boolean>;
  _countries: Reference<Country> = {
    id: null,
    collection: Collection.Countries
  };
  _cities: Reference<City> = {
    id: null,
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
      .pipe(select(CoreSelectors.selectConstraint('lastSalary')), untilDestroyed(this))
      .subscribe((constraint) => {
        if (constraint) {
          return this.signupForm.controls.lastSalary.setValidators([
            CustomValidators.required,
            CustomValidators.max(constraint.max ? constraint.max : 999)
          ]);
        }
      });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy() {
    // Required for untilDestroyed
  }

  clearError() {
    this.store.dispatch(SignupActions.clearSignupError());
  }

  submit(): void {
    for (const key in this.signupForm.controls) {
      if (key) {
        this.signupForm.controls[key].markAsDirty();
        this.signupForm.controls[key].updateValueAndValidity();
      }
    }

    this.store.dispatch(SignupActions.signUp({ context: this.signupForm.value }));
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
