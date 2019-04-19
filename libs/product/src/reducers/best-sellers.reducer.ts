import { BestSellersActionTypes, BestSellersActions } from '../actions/best-sellers.actions';
import { Product } from '../models/product';

export interface BestSellersState {
  productIds: string[],
  loading: boolean,
  errors: string[]
}

export const initialState: BestSellersState = {
  productIds: [],
  loading: false,
  errors: []
};

export const resetState: BestSellersState = Object.assign({}, initialState);

export function bestSellersReducer(state = initialState, action: BestSellersActions): BestSellersState {
  switch (action.type) {
    case BestSellersActionTypes.BestSellersLoadAction:
      return {...state, loading: true};
    case BestSellersActionTypes.BestSellersLoadSuccessAction:
      return {...state, loading: false, productIds: getIds(action.payload)};
    case BestSellersActionTypes.BestSellersLoadFailureAction:
      return {...state, 
        loading: false, 
        errors: state.errors.concat(new Array(action.payload))
      };
    case BestSellersActionTypes.BestSellersResetAction:
      return {
        ...resetState
      }
    default:
      return state;
  }
}

function getIds(products: Product[]): string[] {
  const ids: string[] = new Array();

  products.forEach(product => {
    ids.push(product.id)
  });

  return ids;
}
