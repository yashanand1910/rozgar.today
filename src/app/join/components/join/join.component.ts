import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/core/reducers';
import * as fromJoin from '@app/join/reducers';
import * as JoinSelectors from '@app/join/selectors';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as JoinActions from '@app/join/actions';
import { untilDestroyed } from '@core/utils';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.less']
})
export class JoinComponent implements OnInit, OnDestroy {
  state$: Observable<fromJoin.JoinState['additional']>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.state$ = this.store.pipe(select(JoinSelectors.selectJoinAdditionalState));

    this.store
      .pipe(
        select(fromRoot.selectCurrentRoute),
        map((val) => val.routeConfig.path),
        untilDestroyed(this)
      )
      .subscribe((path: string) => {
        this.store.dispatch(JoinActions.setCurrentStepFromPath({ path }));
      });
  }

  ngOnDestroy() {}
}
