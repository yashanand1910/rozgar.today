import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as CoreActions from '@core/actions';
import * as AuthActions from '@auth/actions';
import { extract } from '@i18n/services';
import { NzMessageRef, NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class CoreEffects {
  initialize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.initialize),
      exhaustMap(() => [CoreActions.loadConstraints(), CoreActions.loadAlerts(), AuthActions.getUser()])
    )
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

  private errorMessageDuration = 9999999;
  private networkError: NzMessageRef;

  constructor(private actions$: Actions, private router: Router, private messageService: NzMessageService) {}
}
