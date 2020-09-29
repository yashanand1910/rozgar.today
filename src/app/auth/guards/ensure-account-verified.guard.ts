import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as AuthSelectors from '@auth/selectors';
import { first, map } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Logger } from '@core/services';
import { extract } from '@i18n/services';
import { StepPath } from '@app/join/models';
import { QueryParamKey } from '@core/models';

const log = new Logger('EnsureAccountVerifiedGuard');

@Injectable({
  providedIn: 'root'
})
export class EnsureAccountVerifiedGuard implements CanActivate {
  constructor(private store: Store, private messageService: NzMessageService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(AuthSelectors.selectAuthUser),
      first(),
      map((user) => {
        if (user) {
          if (!user.emailVerified) {
            log.debug('Account not verified, navigating...');
            this.messageService.info(extract('You need to verify your account first.'));
            const urlTree = this.router.parseUrl(`/join/${StepPath.Account}`);
            urlTree.queryParams = { [QueryParamKey.ReturnUrl]: state.url };
            return urlTree;
          } else {
            return true;
          }
        }

        return false;
      })
    );
  }
}
