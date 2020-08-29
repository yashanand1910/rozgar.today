import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Plan } from '@app/join/models';
import * as PlanActions from '../actions/plan.actions';

export const plansFeatureKey = 'plans';

export interface State extends EntityState<Plan> {
  currentPlanId: Plan['id'] | null;
  isLoading: boolean;
}

export const adapter: EntityAdapter<Plan> = createEntityAdapter<Plan>({
  selectId: (plan) => plan.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  currentPlanId: null,
  isLoading: true,
});

export const reducer = createReducer(
  initialState,
  on(PlanActions.loadPlans, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PlanActions.loadPlansSuccess, (state, action) => ({
    ...adapter.setAll(action.plans, state),
    isLoading: false,
  })),
  on(PlanActions.setCurrentPlan, (state, action) => ({
    ...state,
    currentPlanId: action.id,
  }))
);

export const getCurrentPlanId = (state: State) => state.currentPlanId;
export const getIsLoading = (state: State) => state.isLoading;
