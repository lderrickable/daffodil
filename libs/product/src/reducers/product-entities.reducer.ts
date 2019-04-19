import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { ProductGridActionTypes, ProductGridActions } from '../actions/product-grid.actions';
import { ProductActionTypes, ProductActions } from '../actions/product.actions';
import { BestSellersActionTypes, BestSellersActions } from '../actions/best-sellers.actions';
import { Product } from '../models/product';

export interface ProductEntitiesState extends EntityState<Product> {}

export const productAdapter : EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProductEntitiesState = productAdapter.getInitialState();

export function productEntitiesReducer(
  state = initialState, 
  action: ProductGridActions | BestSellersActions | ProductActions): ProductEntitiesState {
  switch (action.type) {
    case ProductGridActionTypes.ProductGridLoadSuccessAction:
      return productAdapter.upsertMany(action.payload, state);
    case BestSellersActionTypes.BestSellersLoadSuccessAction:
      return productAdapter.upsertMany(action.payload, state);
    case ProductActionTypes.ProductLoadSuccessAction:
      return productAdapter.upsertOne(
        { 
          id: action.payload.id, 
          ...action.payload
        },
        state
      );
    case ProductGridActionTypes.ProductGridResetAction:
      return productAdapter.removeAll(state);
    default:
      return state;
  }
}
