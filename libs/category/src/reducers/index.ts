import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromCategory from './category.reducer';

export interface State {
  category: fromCategory.State;
}

export const reducers : ActionReducerMap<State> = {
  category: fromCategory.reducer
}

/**
 * Category Feature State
 */
const selectCategoryFeatureState = createFeatureSelector<State>('category');

/**
 * Category State
 */
const selectCategoryState = createSelector(
  selectCategoryFeatureState,
  (state: State) => state.category
);

export const selectCategory = createSelector(
  selectCategoryState,
  (state: fromCategory.State) => state.category
);

export const selectCategoryLoading = createSelector(
  selectCategoryState,
  (state: fromCategory.State) => state.loading
);

export const selectCategoryErrors = createSelector(
  selectCategoryState,
  (state: fromCategory.State) => state.errors
);
