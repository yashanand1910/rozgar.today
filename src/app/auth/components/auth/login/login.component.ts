import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../actions';
import * as AuthSelectors from '../../../selectors';
import { CustomValidators } from '@shared/validators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less', '../auth.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  passwordVisible = false;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.createForm();
  }

  ngOnInit() {
    this.store.dispatch(AuthActions.ensureLogOut());

    this.error$ = this.store.select(AuthSelectors.selectLoginError);
    this.isLoading$ = this.store.select(AuthSelectors.selectLoginIsLoading);
  }

  ngOnDestroy() {}

  login() {
    for (const key in this.loginForm.controls) {
      if (key) {
        this.loginForm.controls[key].markAsDirty();
        this.loginForm.controls[key].updateValueAndValidity();
      }
    }

    this.store.dispatch(AuthActions.logIn({ context: this.loginForm.value }));
  }

  clearError() {
    this.store.dispatch(AuthActions.clearLoginError());
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [CustomValidators.required, CustomValidators.email]],
      password: ['', [CustomValidators.required]],
      remember: [true]
    });
  }
}
