import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CoreActions } from '@core/actions';
import { CoreSelectors } from '@core/selectors';
import { AuthSelectors } from '@auth/selectors';
import { select, Store } from '@ngrx/store';
import { filter, first, switchMap, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// Ensures state is updated with latest from Firestore is user is logged in
export class EnsureFirestoreStateUpdatedGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(CoreSelectors.selectIsUpdated),
      withLatestFrom(this.store.pipe(select(AuthSelectors.selectUser))),
      first(),
      switchMap(([isUpdated, user]) => {
        if (user && !isUpdated) {
          this.store.dispatch(CoreActions.getFirestoreState());
          return this.store.pipe(
            select(CoreSelectors.selectIsUpdated),
            filter((isUpdated) => isUpdated)
          );
        }
        return of(true);
      })
    );
  }
}
