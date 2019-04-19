import { ProductActionTypes, ProductActions } from '../actions/product.actions';

export interface ProductState {
  selectedProductId: string,
  qty: number,
  loading: boolean,
  errors: string[]
}

export const initialState: ProductState = {
  selectedProductId: null,
  qty: 1,
  loading: false,
  errors: []
};

export function productReducer(state = initialState, action: ProductActions): ProductState {
  switch (action.type) {
    case ProductActionTypes.ProductLoadAction:
      return {...state, loading: true, selectedProductId: action.payload};
    case ProductActionTypes.ProductLoadSuccessAction:
      return {...state, loading: false};
    case ProductActionTypes.ProductLoadFailureAction:
      return {...state, 
        loading: false, 
        errors: state.errors.concat(new Array(action.payload))
      };
    case ProductActionTypes.UpdateQtyAction:
      return {...state, qty: action.payload}
    default:
      return state;
  }
}
