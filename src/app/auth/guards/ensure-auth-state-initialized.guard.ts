import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AuthSelectors } from '@auth/selectors';
import { filter, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnsureAuthStateInitializedGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.pipe(
      select(AuthSelectors.selectIsLoaded),
      filter((isLoaded) => isLoaded), // Won't emit false, will only wait until gets true
      first()
    );
  }
}
