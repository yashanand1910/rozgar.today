import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { exhaustMap, first, map, take, takeUntil } from 'rxjs/operators';
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
  private isAuthReloading = false;

  ngOnInit(): void {
    super.ngOnInit();

    this.emailVerified$ = this.store.pipe(
      select(AuthSelectors.selectUser),
      map((user) => {
        if (user?.emailVerified) {
          this.stopReloadingAuth();
        } else {
          this.startReloadingAuth();
        }
        return user?.emailVerified;
      })
    );
  }

  ngOnDestroy() {
    this.stopReloadingAuth();
  }

  private startReloadingAuth() {
    if (!this.isAuthReloading) {
      this.isAuthReloading = true;
      this.store.dispatch(AuthActions.startReloadingAuth());
    }
  }

  private stopReloadingAuth() {
    if (this.isAuthReloading) {
      this.isAuthReloading = false;
      this.store.dispatch(AuthActions.stopReloadingAuth());
    }
  }

  sendVerificationEmail() {
    this.store.dispatch(AuthActions.sendVerificationEmail());
    this.secondsLeft$ = this.actions$.pipe(
      // Start cooldown only after email was successfully sent
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
