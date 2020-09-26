import { createAction } from '@ngrx/store';

export const initialize = createAction('[Core] Initialize');

export const networkError = createAction('[Core] Network Error');
