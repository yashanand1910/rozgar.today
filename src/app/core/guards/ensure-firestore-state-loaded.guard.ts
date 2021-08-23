import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as CoreSelectors from '@core/selectors';
import { filter, first } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
// Ensures state is updated with latest from Firestore and redirects user so they don't have to restart
export class EnsureFirestoreStateLoadedGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.pipe(
      select(CoreSelectors.selectIsLoaded),
      filter((isLoaded) => isLoaded), // Won't emit false, will only wait until gets true
      first(),
    );
  }
}
