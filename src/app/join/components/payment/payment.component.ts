import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StripeActions } from '@core/actions';
import { JoinSelectors } from '../../selectors';
import { StripeSelectors } from '@core/selectors';
import { Collection, PaymentIntentContext, Reference } from '@core/models';
import { tap, withLatestFrom } from 'rxjs/operators';
import { areSetsEqual } from '@shared/helper';
import { Product } from '@core/models/product';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less', '../join.component.less']
})
export class PaymentComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initialize();
  }

  /**
   * Create/Load/Update Stripe Payment Intent for the context with the selected plan
   */
  initialize() {
    this.store.pipe(
      select(JoinSelectors.selectSelectedPlanId),
      withLatestFrom(
        this.store.select(StripeSelectors.selectPaymentIntentState, {
          context: PaymentIntentContext.FirstTimePlanPurchase
        })
      ),
      tap(([planId, paymentIntent]) => {
        const products = new Set<Reference<Product>>([{ collection: Collection.Plans, id: planId }]);

        // If payment intent found in state
        if (paymentIntent) {
          if (areSetsEqual(paymentIntent.products, products)) {
            this.store.dispatch(
              StripeActions.createPaymentIntent({
                context: PaymentIntentContext.FirstTimePlanPurchase,
                products
              })
            );
          } else {
            this.store.dispatch(
              StripeActions.updatePaymentIntent({
                id: paymentIntent.id,
                context: PaymentIntentContext.FirstTimePlanPurchase,
                products
              })
            );
          }
        } else {
          this.store.dispatch(
            StripeActions.createPaymentIntent({
              context: PaymentIntentContext.FirstTimePlanPurchase,
              products
            })
          );
        }
      })
    );
  }
}
