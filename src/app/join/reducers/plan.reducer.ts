import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Plan } from '@app/join/models';
import * as PlanActions from '../actions/plan.actions';

export const plansFeatureKey = 'plans';

export interface State extends EntityState<Plan> {
  currentPlanId: Plan['id'] | null;
  isLoading: boolean;
  error: any;
  hasLoaded: boolean;
}

export const adapter: EntityAdapter<Plan> = createEntityAdapter<Plan>({
  selectId: (plan) => plan.id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  currentPlanId: null,
  isLoading: true,
  error: null,
  hasLoaded: false
});

export const reducer = createReducer(
  initialState,
  on(PlanActions.loadPlans, (state) => ({
    ...state,
    isLoading: true,
    hasLoaded: false
  })),
  on(PlanActions.loadPlansSuccess, (state, action) => ({
    ...adapter.setAll(action.plans, state),
    isLoading: false,
    hasLoaded: true
  })),
  on(PlanActions.loadPlansFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(PlanActions.setCurrentPlan, (state, action) => ({
    ...state,
    currentPlanId: action.id
  }))
);

export const getCurrentPlanId = (state: State) => state.currentPlanId;
export const getIsLoading = (state: State) => state.isLoading;
export const getHasLoaded = (state: State) => state.hasLoaded;
