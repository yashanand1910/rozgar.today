import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { extract } from '@i18n/services';
import * as JoinSelectors from '@app/join/selectors';
import { NzMessageService } from 'ng-zorro-antd';
import { Logger } from '@core/services';

const log = new Logger('EnsurePlanSelectedGuard');

@Injectable({
  providedIn: 'root'
})
export class EnsurePlanSelectedGuard implements CanActivate {
  constructor(private store: Store, private router: Router, private messageService: NzMessageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(JoinSelectors.selectCurrentPlanId),
      map((planId) => {
        if (!planId) {
          this.messageService.info(extract('Please select a plan first.'));
          log.debug('Plan not selected, redirecting...');
          this.router.navigate(['/join/plan']).then();
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
