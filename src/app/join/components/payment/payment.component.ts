import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StripeActions } from '@core/actions';
import { JoinSelectors } from '../../selectors';
import { StripeSelectors } from '@core/selectors';
import { Collection, PaymentIntentContext, Reference } from '@core/models';
import { first, tap, withLatestFrom } from 'rxjs/operators';
import { areArrayElementsEqual } from '@shared/helper';
import { Product } from '@core/models/product';
import { Observable } from 'rxjs';
import { PaymentIntentState } from '@core/reducers/stripe.reducer';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less', '../join.component.less']
})
export class PaymentComponent implements OnInit {
  paymentIntent$: Observable<PaymentIntentState>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.paymentIntent$ = this.store.pipe(
      select(StripeSelectors.selectPaymentIntentState, {
        context: PaymentIntentContext.FirstTimePlanPurchase
      })
    );

    this.initialize();
  }

  /**
   * Create/Load/Update Stripe Payment Intent for the context with the selected plan
   */
  initialize() {
    this.store
      .pipe(
        select(JoinSelectors.selectSelectedPlanId),
        first(),
        withLatestFrom(
          this.store.select(StripeSelectors.selectPaymentIntentState, {
            context: PaymentIntentContext.FirstTimePlanPurchase
          })
        ),
        tap(([planId, paymentIntent]) => {
          const products = [{ collection: Collection.Plans, id: planId }];

          // If payment intent found in state
          if (paymentIntent) {
            if (areArrayElementsEqual<Reference<Product>>(paymentIntent.products, products)) {
              this.store.dispatch(
                StripeActions.loadPaymentIntent({
                  context: PaymentIntentContext.FirstTimePlanPurchase,
                  id: paymentIntent.id
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
      )
      .subscribe();
  }
}
