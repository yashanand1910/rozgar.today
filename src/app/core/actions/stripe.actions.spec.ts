import * as fromStripe from './stripe.actions';

describe('loadStripes', () => {
  it('should return an action', () => {
    expect(fromStripe.createPaymentIntent().type).toBe('[Stripe] Create Payment Intent');
  });
});
