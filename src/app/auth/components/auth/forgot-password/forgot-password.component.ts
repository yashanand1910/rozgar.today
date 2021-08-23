import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from '@shared/validators';
import * as AuthActions from '@auth/actions';
import * as ForgotPasswordSelectors from '@auth/selectors/forgot-password.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.less', '../auth.component.less']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  error$: Observable<string>;
  info$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.createForm();

    this.error$ = this.store.select(ForgotPasswordSelectors.selectError);
    this.info$ = this.store.select(ForgotPasswordSelectors.selectInfo);
    this.isLoading$ = this.store.select(ForgotPasswordSelectors.selectIsLoading);
  }

  submit() {
    for (const key in this.forgotPasswordForm.controls) {
      if (key) {
        this.forgotPasswordForm.controls[key].markAsDirty();
        this.forgotPasswordForm.controls[key].updateValueAndValidity();
      }
    }

    this.store.dispatch(AuthActions.forgotPassword({ context: this.forgotPasswordForm.value }));
  }

  clearInfo() {
    this.store.dispatch(AuthActions.clearForgotPasswordInfo());
  }

  clearError() {
    this.store.dispatch(AuthActions.clearForgotPasswordError());
  }

  private createForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [CustomValidators.required, CustomValidators.email]]
    });
  }
}
