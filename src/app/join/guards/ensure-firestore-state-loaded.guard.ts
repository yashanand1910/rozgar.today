import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as JoinActions from '@app/join/actions';
import { take, map } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

@Injectable()
export class EnsureFirestoreStateLoadedGuard implements CanActivate {
  constructor(private store: Store, private actions$: Actions) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.store.dispatch(JoinActions.getJoinFirestoreState());

    return this.actions$.pipe(
      ofType(JoinActions.getJoinFirestoreStateSuccess),
      take(1),
      map(() => true)
    );
  }
}
