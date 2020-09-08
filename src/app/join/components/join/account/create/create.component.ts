import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@core/reducers';
import { CustomValidators } from '@shared/validators';
import { untilDestroyed } from '@core/utils';
import * as SignupSelectors from '@auth/selectors';
import * as JoinActions from '@app/join/actions';
import * as AuthActions from '@auth/actions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less', '../../join.component.less']
})
export class CreateComponent implements OnInit, OnDestroy {
  passwordVisible: boolean;
  signupForm!: FormGroup;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.signupForm.controls.password.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
      this.signupForm.controls.confirmPassword.updateValueAndValidity();
    });

    this.error$ = this.store.pipe(select(SignupSelectors.selectSignupError));
    this.isLoading$ = this.store.pipe(select(SignupSelectors.selectSignupIsLoading));
  }

  ngOnDestroy() {}

  back() {
    this.store.dispatch(JoinActions.previousStep());
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
