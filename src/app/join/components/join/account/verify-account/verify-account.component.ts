import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import * as AuthActions from '@auth/actions';
import * as AuthSelectors from '@auth/selectors';
import { StepComponent } from '../../step.component';
import { ofType } from '@ngrx/effects';
import { select } from '@ngrx/store';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.less']
})
export class VerifyAccountComponent extends StepComponent implements OnInit, OnDestroy {
  emailVerified$: Observable<boolean>;
  secondsLeft$: Observable<number>;
  private cooldownSeconds = 30;

  ngOnInit(): void {
    super.ngOnInit();

    this.store.dispatch(AuthActions.startReloadingUser());
    this.emailVerified$ = this.store.pipe(
      select(AuthSelectors.selectAuthUser),
      map((user) => {
        if (user?.emailVerified) {
          this.store.dispatch(AuthActions.stopReloadingUser());
        }
        return user?.emailVerified;
      })
    );
  }

  ngOnDestroy() {
    this.store.dispatch(AuthActions.stopReloadingUser());
  }

  sendVerificationEmail() {
    this.store.dispatch(AuthActions.sendVerificationEmail());
    this.secondsLeft$ = this.actions$.pipe(
      // Start cooldown only when email was successfully sent
      ofType(AuthActions.sendVerificationEmailSuccess),
      exhaustMap(() => {
        let time = this.cooldownSeconds - 1;
        return timer(0, 1000).pipe(
          map(() => time--),
          take(this.cooldownSeconds)
        );
      })
    );
  }
}
