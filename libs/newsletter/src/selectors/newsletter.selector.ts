import { createSelector, MemoizedSelector, createFeatureSelector } from '@ngrx/store';
import { DaffNewsletterSubmission } from '../models/newsletter.model';
import { DaffNewsletterState } from '../reducers/newsletter.reducer';

export interface State {
  newsletter: DaffNewsletterState<any>
}

/**
 * Feature State Selector
 */
const selectNewsletterFeatureState: 
  MemoizedSelector<State, DaffNewsletterState<any>> = createFeatureSelector<DaffNewsletterState<any>>('newsletter');


/**
 * Child key of feature state
 */
export const selectDaffNewsletterLoading = createSelector(
  selectNewsletterFeatureState,
  (state: DaffNewsletterState<any>) => state.loading
);

export const selectDaffNewsletterError = createSelector(
  selectNewsletterFeatureState,
  (state: DaffNewsletterState<any>) => state.error
);

export const selectDaffNewsletterSuccess = createSelector(
  selectNewsletterFeatureState,
  (state: DaffNewsletterState<any>) => state.success
);
export const submission = createSelector(
  selectNewsletterFeatureState,
  (state: DaffNewsletterState<any>) => state.submission
);
