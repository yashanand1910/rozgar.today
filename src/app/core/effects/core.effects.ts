import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, observeOn, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as CoreActions from '@core/actions';
import * as AuthActions from '@auth/actions';
import { extract } from '@i18n/services';
import { NzMessageRef, NzMessageService } from 'ng-zorro-antd/message';
import { asyncScheduler } from 'rxjs';

@Injectable()
export class CoreEffects {
  initialize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.initialize),
      exhaustMap(() => [CoreActions.loadConstraints(), CoreActions.loadAlerts(), AuthActions.loadAuth()])
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

  showLoadingMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActions.showLoadingMessage),
        tap(() => {
          if (!this.loadingMessage) {
            this.loadingMessage = this.messageService.loading(extract('Please wait...'), {
              nzDuration: this.loadingMessageDuration
            });
          }
          this.loadingMessageCount++;
          console.warn(this.loadingMessageCount);
        })
      ),
    { dispatch: false }
  );

  clearLoadingMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        observeOn(asyncScheduler),
        ofType(CoreActions.clearLoadingMessage),
        tap(() => {
          if (this.loadingMessageCount) {
            if (this.loadingMessageCount === 1) {
              this.messageService.remove(this.loadingMessage.messageId);
            }
            this.loadingMessageCount--;
            console.warn(this.loadingMessageCount);
          }
        })
      ),
    { dispatch: false }
  );

  private errorMessageDuration = 9999999;
  private networkError: NzMessageRef;
  private loadingMessageDuration = 9999999;
  private loadingMessage: NzMessageRef;
  private loadingMessageCount = 0;

  constructor(private actions$: Actions, private router: Router, private messageService: NzMessageService) {}
}
