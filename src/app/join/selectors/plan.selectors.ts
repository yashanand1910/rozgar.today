import { createSelector } from '@ngrx/store';
import * as fromPlan from '../reducers/plan.reducer';
import { selectJoinState } from '@app/join/selectors/join.selectors';

export const selectPlanState = createSelector(selectJoinState, (state) => state[fromPlan.plansFeatureKey]);

export const { selectAll: selectAllPlans } = fromPlan.adapter.getSelectors(selectPlanState);

export const selectCurrentPlanId = createSelector(selectPlanState, fromPlan.getCurrentPlanId);

export const selectPlansIsLoading = createSelector(selectPlanState, fromPlan.getIsLoading);
