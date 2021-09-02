import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthSelectors } from '@auth/selectors';
import { Store } from '@ngrx/store';
import { User } from '@auth/models';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less']
})
export class AccountComponent implements OnInit {
  user$: Observable<User>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.isLoading$ = this.store.select(AuthSelectors.selectIsLoading);
  }
}
