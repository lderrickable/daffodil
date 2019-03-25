import { CartActionTypes, CartActions } from '../actions/cart.actions';
import { Cart } from '../models/cart';

/**
 * Interface for fields on cart state.
 */
export interface State {
  cart: Cart,
  loading: boolean,
  errors: string[]
}

/**
 * Initial values of cart state.
 */
export const initialState: State = Object.freeze({
  cart: null,
  loading: false,
  errors: []
});

/**
 * Deep copy of the initial state for reseting cart state.
 */
export const resetState: State = Object.assign({}, initialState);

/**
 * Reducer function that catches actions and changes/overwrites best seller state.
 * 
 * @param state Current state of the redux store
 * @param action A cart action
 * @returns Cart state
 */
export function reducer(state = initialState, action: CartActions): State {
  switch (action.type) {
    case CartActionTypes.CartLoadAction:
    case CartActionTypes.AddToCartAction:
      return {...state, loading: true};
    case CartActionTypes.CartLoadSuccessAction:
    case CartActionTypes.AddToCartSuccessAction:
      return {...state, cart: action.payload, loading: false};
    case CartActionTypes.CartLoadFailureAction:
    case CartActionTypes.AddToCartFailureAction:
      return {...state,
        loading: false,
        errors: state.errors.concat(new Array(action.payload))
      };
    case CartActionTypes.CartResetAction:
      return {
        ...resetState
      }
    default:
      return state;
  }
}

/**
 * Selects cart from state.
 * 
 * @param state Current redux state object
 * @returns A cart
 */
export const getCart = (state: State) => state.cart;

/**
 * Selects loading status from state.
 * 
 * @param state Current redux state object
 * @returns Loading state of the cart
 */
export const getCartLoading = (state: State) => state.loading;
