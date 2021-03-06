import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as JoinSelectors from '@app/join/selectors';
import * as AuthSelectors from '@auth/selectors';
import { Store } from '@ngrx/store';
import { Step, StepPath } from '@app/join/models';
import { ActivatedRoute, Router } from '@angular/router';
import { first, withLatestFrom } from 'rxjs/operators';
import { Logger } from '@core/services';

const log = new Logger('JoinComponent');

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.less']
})
export class JoinComponent implements OnInit, OnDestroy {
  currentStepNumber$: Observable<number>;
  steps$: Observable<Step[]>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentStepNumber$ = this.store.select(JoinSelectors.selectJoinCurrentStepNumber);
    this.steps$ = this.store.select(JoinSelectors.selectJoinSteps);
    this.isLoading$ = this.store.select(JoinSelectors.selectJoinIsLoading);

    this.setCurrentStepBasedOnState();
  }

  ngOnDestroy() {}

  // Set step based on user's saved state (progress) if no step is already set
  setCurrentStepBasedOnState() {
    if (this.router.url.split('?')[0] === '/join') {
      this.store
        .select(JoinSelectors.selectJoinAdditionalState)
        .pipe(first(), withLatestFrom(this.store.select(AuthSelectors.selectAuthUser)))
        .subscribe(([state, user]) => {
          if (!user) {
            log.debug('Navigating to first step since user not logged in...');
            this.navigateToStepBasedOnPath(StepPath.Plan);
          } else {
            log.debug('Navigating to step based on user progress...');
            if (user.emailVerified) {
              this.navigateToNextStepBasedOnPath(StepPath.Account, state.steps);
            } else if (state.selectedPlanId) {
              this.navigateToNextStepBasedOnPath(StepPath.Plan, state.steps);
            }
          }
        });
    }
  }

  navigateToStepBasedOnPath(path: StepPath) {
    this.router.navigate([path], { relativeTo: this.route, queryParamsHandling: 'preserve', replaceUrl: true }).then();
  }

  navigateToNextStepBasedOnPath(path: StepPath, steps: Step[]) {
    const nextStepPath = steps[steps.findIndex((step) => step.path === path) + 1].path;
    this.router
      .navigate([nextStepPath], { relativeTo: this.route, queryParamsHandling: 'preserve', replaceUrl: true })
      .then();
  }
}
