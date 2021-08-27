import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthSelectors } from '@auth/selectors';
import { AuthActions } from '@auth/actions';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@auth/models';

export interface MenuItem {
  title: Observable<string>;
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
  styleUrls: ['./shell.component.less']
})
export class ShellComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  isLoading$: Observable<boolean>;
  headerMenuItemsLeft: MenuItem[];
  headerMenuItemsRight: MenuItem[];

  constructor(private store: Store) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(AuthSelectors.selectIsLoading);
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.updateHeader();
  }

  ngOnDestroy() {}

  invokeAction(action: MenuItem['action']) {
    action?.call(this);
  }

  private logout() {
    this.store.dispatch(AuthActions.logOut());
  }

  private updateHeader() {
    this.headerMenuItemsLeft = [];
    this.headerMenuItemsRight = [
      {
        title: of('Join'),
        hidden: this.user$.pipe(map((user) => !!user)),
        link: '/join/plan' // TODO needs to be /join but that is not working as expected
      },
      {
        title: of('Login'),
        hidden: this.user$.pipe(map((user) => !!user)),
        link: '/auth'
      },
      {
        title: this.user$.pipe(map((user) => this.getFirstName(user?.displayName))),
        hidden: this.user$.pipe(map((user) => !user)),
        icon: 'user',
        submenu: [
          {
            title: of('Settings'),
            disabled: true,
            icon: 'setting'
          },
          {
            title: of('Logout'),
            icon: 'logout',
            action: this.logout
          }
        ]
      }
    ];
  }

  private getFirstName = (displayName: string) => {
    return displayName?.split(' ')[0];
  };
}
