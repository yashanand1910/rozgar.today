import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginActions, AuthActions } from '../../actions';
import { LoginSelectors } from '../../selectors';
import { CustomValidators } from '@shared/validators';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less', '../auth.component.less']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordVisible = false;
  error$: Observable<FirebaseError>;
  isLoading$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.createForm();
  }

  ngOnInit() {
    this.store.dispatch(AuthActions.ensureLogOut());

    this.error$ = this.store.select(LoginSelectors.selectError);
    this.isLoading$ = this.store.select(LoginSelectors.selectIsLoading);
  }

  login() {
    for (const key in this.loginForm.controls) {
      if (key) {
        this.loginForm.controls[key].markAsDirty();
        this.loginForm.controls[key].updateValueAndValidity();
      }
    }

    this.store.dispatch(LoginActions.logIn({ context: this.loginForm.value }));
  }

  clearError() {
    this.store.dispatch(LoginActions.clearLoginError());
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [CustomValidators.required, CustomValidators.email]],
      password: ['', [CustomValidators.required]],
      remember: [true]
    });
  }
}
