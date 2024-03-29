import { Component, OnInit } from '@angular/core';
import { ResetPasswordActions } from '@auth/actions';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ResetPasswordSelectors } from '@auth/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomValidators } from '@shared/validators';
import { User } from '@auth/models';
import firebase from 'firebase/compat/app';
import FirebaseError = firebase.FirebaseError;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less', '../auth.component.less']
})
export class ResetPasswordComponent implements OnInit {
  passwordVisible = false;
  resetPasswordForm!: FormGroup;
  user$: Observable<Partial<User>>;
  error$: Observable<FirebaseError>;
  isLoading$: Observable<boolean>;
  isVerifying$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ResetPasswordActions.verifyResetPasswordCode());
    this.createForm();

    this.user$ = this.store.select(ResetPasswordSelectors.selectUser);
    this.error$ = this.store.select(ResetPasswordSelectors.selectError);
    this.isLoading$ = this.store.select(ResetPasswordSelectors.selectIsLoading);
    this.isVerifying$ = this.store.select(ResetPasswordSelectors.selectIsVerifying);
  }

  resetPassword() {
    for (const key in this.resetPasswordForm.controls) {
      if (key) {
        this.resetPasswordForm.controls[key].markAsDirty();
        this.resetPasswordForm.controls[key].updateValueAndValidity();
      }
    }

    this.store.dispatch(ResetPasswordActions.resetPassword({ context: this.resetPasswordForm.value }));
  }

  clearError() {
    this.store.dispatch(ResetPasswordActions.clearResetPasswordError());
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
