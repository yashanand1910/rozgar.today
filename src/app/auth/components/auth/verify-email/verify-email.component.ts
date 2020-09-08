import { Component, OnInit } from '@angular/core';
import * as fromAuth from '@auth/reducers';
import * as AuthActions from '@auth/actions';
import * as AuthSelectors from '@auth/selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.less', '../auth.component.less']
})
export class VerifyEmailComponent implements OnInit {
  state$: Observable<fromAuth.AuthState['verifyEmail']>;

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit(): void {
    this.state$ = this.store.pipe(select(AuthSelectors.selectVerifyEmailState));

    this.store.dispatch(AuthActions.verifyEmailCode());
  }
}
