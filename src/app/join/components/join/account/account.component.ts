import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromAuth from '@auth/reducers';
import * as AuthSelectors from '@auth/selectors';
import { select, Store } from '@ngrx/store';
import { User } from '@auth/models';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less'],
})
export class AccountComponent implements OnInit {
  user$: Observable<User>;
  isLoading$: Observable<boolean>;
  signupIsLoading$: Observable<boolean>;

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {
    this.user$ = this.store.pipe(select(AuthSelectors.selectUser));
    this.isLoading$ = this.store.pipe(select(AuthSelectors.selectIsLoading));
    this.signupIsLoading$ = this.store.pipe(select(AuthSelectors.selectSignupIsLoading));
  }
}
