import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { extract } from '@i18n/services';
import * as CoreSelectors from '@core/selectors';
import { NzMessageService } from 'ng-zorro-antd';
import { Logger } from '@core/services';
import { Collection } from '@core/models';

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
      select(CoreSelectors.selectCollectionSelectedId(Collection.Plans)),
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
