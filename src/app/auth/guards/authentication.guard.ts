import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Logger } from '@core/services';
import { CredentialsService } from '@auth/services';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private credentialsService: CredentialsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.credentialsService.isAuthenticated()) {
      return true;
    }

    log.debug('Not authenticated, redirecting and adding redirect url...');
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/auth'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}
