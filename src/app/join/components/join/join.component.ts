import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Step } from '@app/join/models';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/core/reducers';
import * as fromJoin from '@app/join/reducers';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as JoinActions from '@app/join/actions';
import { untilDestroyed } from '@core/utils';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  currentNumber$: Observable<number>;
  steps$: Observable<Step[]>;
  status = 'process';

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.steps$ = this.store.pipe(select(fromJoin.selectSteps));
    this.isLoading$ = this.store.pipe(select(fromJoin.selectStepsIsLoading));
    this.currentNumber$ = this.store.pipe(select(fromJoin.selectStepsCurrentNumber));

    this.store
      .pipe(
        select(fromRoot.selectCurrentRoute),
        map((val) => val.routeConfig.path),
        untilDestroyed(this)
      )
      .subscribe((path: string) => {
        console.log(path);
        this.store.dispatch(JoinActions.setCurrentStepFromPath({ path }));
      });
  }

  ngOnDestroy() {}
}
