import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '@auth/reducers';
import * as AuthSelectors from '@auth/selectors';
import * as AuthActions from '@auth/actions';
import { Observable, of } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { User } from '@auth/models';

export interface MenuItem {
  title: string | Observable<string>;
  icon?: string;
  link?: string;
  disabled?: boolean;
  hidden?: Observable<boolean>;
  submenu?: MenuItem[];
  action?: () => void;
}

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.less'],
})
export class ShellComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  isLoading$: Observable<boolean>;
  headerMenuItemsLeft: MenuItem[];
  headerMenuItemsRight: MenuItem[];

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {
    this.store.dispatch(AuthActions.getUser());
    this.isLoading$ = this.store.pipe(select(AuthSelectors.selectIsLoading));
    this.user$ = this.store.pipe(share(), select(AuthSelectors.selectUser));
    this.updateHeader();
  }

  ngOnDestroy() {}

  invokeAction(action: MenuItem['action']) {
    action.call(this);
  }

  private logout() {
    this.store.dispatch(AuthActions.logOut());
  }

  private updateHeader() {
    this.headerMenuItemsLeft = [];
    this.headerMenuItemsRight = [
      {
        title: of('Join'),
        link: '/join',
      },
      {
        title: of('Login'),
        hidden: this.user$.pipe(map((user) => !!user)),
        link: '/auth',
      },
      {
        title: this.user$.pipe(map((user) => this.getFirstName(user?.displayName))),
        hidden: this.user$.pipe(map((user) => !user)),
        icon: 'user',
        submenu: [
          {
            title: of('Settings'),
            disabled: true,
            icon: 'setting',
          },
          {
            title: of('Logout'),
            icon: 'logout',
            action: this.logout,
          },
        ],
      },
    ];
  }

  private getFirstName = (displayName: string) => {
    return displayName?.split(' ')[0];
  };
}
