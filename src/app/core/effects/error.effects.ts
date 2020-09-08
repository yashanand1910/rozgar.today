import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CoreActions from '../actions';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { extract } from '@i18n/services';

@Injectable()
export class ErrorEffects {
  errorMessageDuration = 10000;

  networkError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActions.networkError),
        tap(() =>
          this.messageService.error(
            extract('Something went wrong. Please check your internet connection or try again after some time.'),
            {
              nzDuration: this.errorMessageDuration
            }
          )
        )
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private messageService: NzMessageService) {}
}
