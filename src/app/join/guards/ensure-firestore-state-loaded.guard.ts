import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as JoinActions from '@app/join/actions';
import { map, first } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

@Injectable()
// Ensures state is updated with latest from Firestore and redirects user so they don't have to restart
export class EnsureFirestoreStateLoadedGuard implements CanActivate {
  constructor(private store: Store, private actions$: Actions) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.store.dispatch(JoinActions.getJoinFirestoreState());

    return this.actions$.pipe(
      ofType(JoinActions.getJoinFirestoreStateSuccess),
      first(),
      map(() => true)
    );
  }
}
