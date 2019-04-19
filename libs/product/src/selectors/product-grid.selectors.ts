import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductGridState } from "../reducers/product-grid.reducer";

export const selectProductGridState = createFeatureSelector<any, ProductGridState>('productGrid');

export const selectProductGridLoadingState = createSelector(
  selectProductGridState,
  (state: ProductGridState) => state.loading
);
