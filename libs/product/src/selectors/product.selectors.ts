import { createSelector, createFeatureSelector, MemoizedSelector } from "@ngrx/store";
import { ProductState } from "../reducers/product.reducer";
import { Product } from "../models/product";
import { selectProductEntitiesState } from "./product-entities.selectors";
import { ProductEntitiesState } from "../reducers/product-entities.reducer";

export const selectProductState = createFeatureSelector<any, ProductState>('product');

export const selectProductId = createSelector(
  selectProductState,
  (state: ProductState) => state.selectedProductId
);

export const selectProductQty = createSelector(
  selectProductState,
  (state: ProductState) => state.qty
);

export const selectProductLoadingState = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);

export const selectSelectedProduct : MemoizedSelector<object, Product> = createSelector(
  selectProductEntitiesState,
  selectProductId,
  (entitiesState: ProductEntitiesState, id: string) => entitiesState.entities[id]
);
