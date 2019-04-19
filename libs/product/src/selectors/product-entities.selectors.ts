import { createSelector, createFeatureSelector, MemoizedSelector } from "@ngrx/store";
import { EntityAdapter, createEntityAdapter, Dictionary } from "@ngrx/entity";

import { ProductEntitiesState } from "../reducers/product-entities.reducer";
import { Product } from "../models/product";

export const productAdapter : EntityAdapter<Product> = createEntityAdapter<Product>();

/**
 * Product Entities ProductEntitiesState
 */
export const selectProductEntitiesState = createFeatureSelector<ProductEntitiesState>('productEntities');

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const selectProductIds = createSelector(
  selectProductEntitiesState,
  productAdapter.getSelectors().selectIds
);

export const selectProductEntities : MemoizedSelector<object, Dictionary<Product>> = createSelector(
  selectProductEntitiesState,
  productAdapter.getSelectors().selectEntities
);

export const selectAllProducts = createSelector(
  selectProductEntitiesState,
  productAdapter.getSelectors().selectAll
);

export const selectProductTotal = createSelector(
  selectProductEntitiesState,
  productAdapter.getSelectors().selectTotal
);
