import { Injectable } from '@angular/core';
import * as fromRouter from '@ngrx/router-store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as CoreActions from '@core/actions';
import { extract } from '@i18n/services';
import { NzMessageRef, NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class CoreEffects {
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

  networkError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActions.networkError),
        tap(() => {
          if (!this.networkError) {
            this.networkError = this.messageService.error(
              extract('Please check your internet connection and reload.'),
              {
                nzDuration: this.errorMessageDuration
              }
            );
          }
        })
      ),
    { dispatch: false }
  );

  private errorMessageDuration = 999999;
  private networkError: NzMessageRef;

  constructor(private actions$: Actions, private router: Router, private messageService: NzMessageService) {}
}
