import { Component, OnInit } from '@angular/core';
import * as AuthSelectors from '@auth/selectors';
import * as AuthActions from '@auth/actions';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomValidators } from '@shared/validators';
import { User } from '@auth/models';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less', '../auth.component.less']
})
export class ResetPasswordComponent implements OnInit {
  passwordVisible = false;
  resetPasswordForm!: FormGroup;
  user$: Observable<Partial<User>>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  isVerifying$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.verifyResetPasswordCode());
    this.createForm();

    this.user$ = this.store.select(AuthSelectors.selectResetPasswordUser);
    this.error$ = this.store.select(AuthSelectors.selectResetPasswordError);
    this.isLoading$ = this.store.select(AuthSelectors.selectResetPasswordIsLoading);
    this.isVerifying$ = this.store.select(AuthSelectors.selectResetPasswordIsVerifying);
  }

  resetPassword() {
    for (const key in this.resetPasswordForm.controls) {
      if (key) {
        this.resetPasswordForm.controls[key].markAsDirty();
        this.resetPasswordForm.controls[key].updateValueAndValidity();
      }
    }

    this.store.dispatch(AuthActions.resetPassword({ context: this.resetPasswordForm.value }));
  }

  clearError() {
    this.store.dispatch(AuthActions.clearResetPasswordError());
  }

  private createForm() {
    this.resetPasswordForm = this.formBuilder.group({
      password: [null, [CustomValidators.required, CustomValidators.minLength(6)]],
      confirmPassword: [null, [CustomValidators.required, this.confirmPasswordValidator]]
    });
  }

  private confirmPasswordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.resetPasswordForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
