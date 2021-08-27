import * as fromStripe from './stripe.actions';
import { PaymentIntentContext } from '@core/models';

describe('loadStripes', () => {
  it('should return an action', () => {
    expect(
      fromStripe.createPaymentIntent({
        context: PaymentIntentContext.FirstTimePlanPurchase,
        productPaths: new Set()
      }).type
    ).toBe('[Stripe] Create Payment Intent');
  });
});
