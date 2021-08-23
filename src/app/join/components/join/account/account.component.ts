import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as AuthSelectors from '@auth/selectors';
import { Store } from '@ngrx/store';
import { User } from '@auth/models';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less']
})
export class AccountComponent implements OnInit {
  user$: Observable<User>;
  signupIsLoading$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.signupIsLoading$ = this.store.select(AuthSelectors.selectIsLoading);
  }
}
