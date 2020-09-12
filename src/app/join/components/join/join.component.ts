import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as JoinSelectors from '@app/join/selectors';
import { Store } from '@ngrx/store';
import { Step } from '@app/join/models';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.less']
})
export class JoinComponent implements OnInit, OnDestroy {
  currentStepNumber$: Observable<number>;
  steps$: Observable<Step[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.currentStepNumber$ = this.store.select(JoinSelectors.selectJoinCurrentStepNumber);
    this.steps$ = this.store.select(JoinSelectors.selectJoinSteps);
  }

  ngOnDestroy() {}
}
