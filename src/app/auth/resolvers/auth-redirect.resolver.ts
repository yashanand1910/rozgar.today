import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
// Resolver for redirection for Firestore auth-related links. Firestor auth links contain 'mode' in query params
export class AuthRedirectResolver implements Resolve<string> {
  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    const mode = route.queryParamMap.get('mode');
    switch (route.queryParamMap.get('mode')) {
      case 'resetPassword':
        this.router.navigate(['/auth/reset-password'], { queryParamsHandling: 'preserve' }).then();
        return of(mode);
      case 'verifyEmail':
        this.router.navigate(['/auth/verify-email'], { queryParamsHandling: 'preserve' }).then();
        return of(mode);
    }
  }
}
