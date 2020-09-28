import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as AuthSelectors from '@auth/selectors';
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
    // Won't return false, will only wait until gets true
    return this.store.pipe(
      select(AuthSelectors.selectAuthIsInitialized),
      filter((isInitialized) => isInitialized),
      first()
    );
  }
}
