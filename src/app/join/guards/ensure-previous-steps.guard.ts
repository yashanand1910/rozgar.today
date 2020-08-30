import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import * as fromJoin from '../reducers';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { extract } from '@i18n/services';
import { Logger } from '@core/services';

const log = new Logger('EnsurePreviousStepsGuard');

@Injectable({
  providedIn: 'root',
})
export class EnsurePreviousStepsGuard implements CanActivate {
  constructor(private store: Store<fromJoin.State>, private router: Router, private messageService: NzMessageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(fromJoin.selectCurrentPlanId),
      switchMap((planId) => {
        switch (next.routeConfig.path) {
          case 'profile': {
            if (!planId) {
              this.messageService.info(extract('Please select a plan first.'));
              log.debug('Plan not selected, redirecting...');
              this.router.navigate(['/join/plan']).then();
              return of(false);
            } else {
              return of(true);
            }
          }
          case 'payment': {
            // TODO check for profile setup before payment
          }
        }
      })
    );
  }
}
