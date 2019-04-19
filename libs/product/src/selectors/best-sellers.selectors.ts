import { createFeatureSelector, MemoizedSelector, createSelector } from "@ngrx/store";

import { BestSellersState } from "../reducers/best-sellers.reducer";

export const selectBestSellersState = createFeatureSelector<BestSellersState>('bestSellers');

export const selectBestSellersLoadingState : MemoizedSelector<object, boolean> = createSelector(
  selectBestSellersState,
  (state: BestSellersState) => state.loading
);

export const selectBestSellersIdsState : MemoizedSelector<object, string[]> = createSelector(
  selectBestSellersState,
  (state: BestSellersState) => state.productIds
);
