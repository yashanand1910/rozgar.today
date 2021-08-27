import { Component, OnInit } from '@angular/core';
import * as fromAuth from '@auth/reducers';
import { VerifyEmailActions } from '@auth/actions';
import { VerifyEmailSelectors } from '@auth/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.less', '../auth.component.less']
})
export class VerifyEmailComponent implements OnInit {
  isVerifying$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  success$: Observable<string>;
  error$: Observable<FirebaseError>;

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(VerifyEmailSelectors.selectIsLoading);
    this.isVerifying$ = this.store.select(VerifyEmailSelectors.selectIsVerifying);
    this.error$ = this.store.select(VerifyEmailSelectors.selectError);
    this.success$ = this.store.select(VerifyEmailSelectors.selectSuccess);

    this.store.dispatch(VerifyEmailActions.verifyEmailCode());
  }
}
