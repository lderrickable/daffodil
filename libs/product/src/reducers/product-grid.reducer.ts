import { ProductGridActionTypes, ProductGridActions } from '../actions/product-grid.actions';
import { Product } from '../models/product';

export interface ProductGridState {
  products: Product[],
  loading: boolean,
  errors: string[]
}

export const initialState: ProductGridState = {
  products: [],
  loading: false,
  errors: []
};

export function productGridReducer(state = initialState, action: ProductGridActions): ProductGridState {
  switch (action.type) {
    case ProductGridActionTypes.ProductGridLoadAction:
      return {...state, loading: true};
    case ProductGridActionTypes.ProductGridLoadSuccessAction:
      return {...state, loading: false};
    case ProductGridActionTypes.ProductGridLoadFailureAction:
      return {...state, 
        loading: false, 
        errors: state.errors.concat(new Array(action.payload))
      };
    default:
      return state;
  }
}
