import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CoreaActions from '@core/actions';
import * as JoinSelectors from '../../../selectors';
import { Collection } from '@core/models';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less', '../join.component.less']
})
export class PaymentComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initiate();
  }

  /**
   * Create Stripe Payment Intent for the selected plan
   */
  initiate() {
    this.store
      .select(JoinSelectors.selectSelectedPlanId)
      .pipe(
        first(),
        map((planId) => {
          this.store.dispatch(
            CoreaActions.createPaymentIntent({
              productPath: `${Collection.Plans}/${planId}`
            })
          );
        })
      )
      .subscribe();
  }
}
