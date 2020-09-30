import * as fromAlert from './alert.actions';

describe('loadAlerts', () => {
  it('should return an action', () => {
    expect(fromAlert.loadAlerts().type).toBe('[Alert] Load Alerts');
  });
});
