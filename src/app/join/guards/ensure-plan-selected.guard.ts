import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { extract } from '@i18n/services';
import * as JoinSelectors from '@app/join/selectors';
import { NzMessageService } from 'ng-zorro-antd';
import { Logger } from '@core/services';
import { QueryParamKey } from '@core/models';
import { StepPath } from '@app/join/models';

const log = new Logger('EnsurePlanSelectedGuard');

@Injectable()
export class EnsurePlanSelectedGuard implements CanActivate {
  constructor(private store: Store, private router: Router, private messageService: NzMessageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(JoinSelectors.selectSelectedPlanId),
      map((planId) => {
        if (!planId) {
          this.messageService.info(extract('You need to select a plan first.'));
          log.debug('Plan not selected, navigating...');
          const urlTree = this.router.parseUrl(`/join/${StepPath.Plan}`);
          urlTree.queryParams = { [QueryParamKey.ReturnUrl]: state.url };
          return urlTree;
        } else {
          return true;
        }
      })
    );
  }
}
