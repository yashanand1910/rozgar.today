import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '@auth/reducers';
import * as AuthSelectors from '@auth/selectors';
import * as AuthActions from '@auth/actions';
import { Observable, of } from 'rxjs';
import { map, share } from 'rxjs/operators';

export interface MenuItem {
  title: string;
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent implements OnInit, OnDestroy {
  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  headerMenuItemsLeft: MenuItem[];
  headerMenuItemsRight: MenuItem[];

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {
    this.store.dispatch(AuthActions.getUser());
    this.isLoading$ = this.store.pipe(select(AuthSelectors.selectIsLoading));
    this.isLoggedIn$ = this.store.pipe(
      share(),
      select(AuthSelectors.selectUser),
      map((user) => !!user)
    );
    this.updateHeader();
  }

  updateHeader() {
    this.headerMenuItemsLeft = [
      {
        title: 'Home',
        link: '/home',
        hidden: of(true),
      },
      {
        title: 'About',
        link: '/about',
        hidden: of(true),
      },
    ];
    this.headerMenuItemsRight = [
      {
        title: 'Join',
        link: '/join',
      },
      {
        title: 'Login',
        hidden: this.isLoggedIn$,
        link: '/auth',
      },
      {
        title: 'User',
        hidden: this.isLoggedIn$.pipe(map((val) => !val)),
        icon: 'user',
        submenu: [
          {
            title: 'Settings',
            disabled: true,
            icon: 'setting',
          },
          {
            title: 'Logout',
            icon: 'logout',
            action: this.logout,
          },
        ],
      },
    ];
  }

  ngOnDestroy() {}

  invokeAction(action: MenuItem['action']) {
    action.call(this);
  }

  logout() {
    this.store.dispatch(AuthActions.logOut());
  }
}
