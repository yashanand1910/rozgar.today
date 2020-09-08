import { Injectable } from '@angular/core';
import * as fromRouter from '@ngrx/router-store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class RouterEffects {
  redirectAuthAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromRouter.routerNavigatedAction),
        filter(
          (action) =>
            action.payload.routerState.root.firstChild.routeConfig.path === 'auth' &&
            action.payload.routerState.root.queryParams.mode
        ),
        map((action) => action.payload.routerState.root.queryParams.mode),
        map((mode) => {
          switch (mode) {
            case 'resetPassword':
              this.router.navigate(['/auth/reset-password'], { queryParamsHandling: 'preserve' }).then();
              break;
            case 'verifyEmail':
              this.router.navigate(['/auth/verify-email'], { queryParamsHandling: 'preserve' }).then();
              break;
          }
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {}
}
