import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as AuthSelectors from '@auth/selectors';
import { first, map } from 'rxjs/operators';
import { QueryParamKey } from '@core/models';
import { NzMessageService } from 'ng-zorro-antd/message';
import { extract } from '@i18n/services';
import { Logger } from '@core/services';

const log = new Logger('AuthGuard');

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router, private messageService: NzMessageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(AuthSelectors.selectUser),
      first(),
      map((user) => {
        if (user) {
          return true;
        } else {
          const urlTree = this.router.parseUrl('/auth');
          urlTree.queryParams = { [QueryParamKey.ReturnUrl]: state.url };
          log.debug('User not authenticated, navigating to login...');
          this.messageService.info(extract('You need to login first.'));
          return urlTree;
        }
      })
    );
  }
}
