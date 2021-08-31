import * as fromStripe from './stripe.actions';
import { PaymentIntentContext } from '@core/models';

describe('loadStripes', () => {
  it('should return an action', () => {
    expect(
      fromStripe.createPaymentIntent({
        context: PaymentIntentContext.FirstTimePlanPurchase,
        products: []
      }).type
    ).toBe('[Stripe] Create Payment Intent');
  });
});
