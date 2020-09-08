import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from '@shared/validators';
import * as fromAuth from '@auth/reducers';
import * as AuthActions from '@auth/actions';
import * as AuthSelectors from '@auth/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.less', '../auth.component.less']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  state$: Observable<fromAuth.AuthState['forgotPassword']>;

  constructor(private formBuilder: FormBuilder, private store: Store<fromAuth.State>) {}

  ngOnInit(): void {
    this.createForm();

    this.state$ = this.store.select(AuthSelectors.selectForgotPasswordState);
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
