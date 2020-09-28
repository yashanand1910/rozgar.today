import { createAction } from '@ngrx/store';

export const initialize = createAction('[Core] Initialize');

export const networkError = createAction('[Core] Network Error');

export const showLoadingMessage = createAction('[Core] Show Loading Message');

export const clearLoadingMessage = createAction('[Core] Clear Loading Message');
