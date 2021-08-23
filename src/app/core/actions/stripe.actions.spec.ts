import * as fromStripe from './stripe.actions';

describe('loadStripes', () => {
  it('should return an action', () => {
    expect(fromStripe.createPaymentIntent({
      productPath: ''
    }).type).toBe('[Stripe] Create Payment Intent');
  });
});
