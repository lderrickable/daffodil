import { Action } from '@ngrx/store';

import { Cart } from '../models/cart';

/**
 * Action types for cart.
 */
export enum CartActionTypes {
    CartLoadAction = "[Cart] Load Action",
    CartLoadSuccessAction = "[Cart] Load Success Action",
    CartLoadFailureAction = "[Cart] Load Failure Action",
    AddToCartAction = "[Cart] Add To Cart Action",
    AddToCartSuccessAction = "[Cart] Add to Cart Success Action",
    AddToCartFailureAction = "[Cart] Add to Cart Failure Action",    
    CartResetAction = "[Cart] Reset Action"
}

/**
 * Triggers a request for the cart.
 */
export class CartLoad implements Action {
  readonly type = CartActionTypes.CartLoadAction;

  constructor() {}
}

/**
 * A request for the cart succeeded.
 * 
 * @param payload - A Cart
 */
export class CartLoadSuccess implements Action {
    readonly type = CartActionTypes.CartLoadSuccessAction;

    constructor(public payload: Cart) {}
}

/**
 * A request for the cart failed.
 * 
 * @param payload - An error message
 */
export class CartLoadFailure implements Action {
  readonly type = CartActionTypes.CartLoadFailureAction;

  constructor(public payload: string) {}
}

/**
 * Add a product to the cart
 * 
 * @param payload - { "productId": string, "qty": number }
 */
export class AddToCart implements Action {
    readonly type = CartActionTypes.AddToCartAction;

    constructor(public payload: {productId: string, qty: number}) {}
}

/**
 * A Product was added to the cart successfully.
 * 
 * @param payload - The updated cart
 */
export class AddToCartSuccess implements Action {
    readonly type = CartActionTypes.AddToCartSuccessAction;

    constructor(public payload: Cart) {}
}

/**
 * An error occurred while adding a Product to the cart.
 * 
 * @param payload - An error message
 */
export class AddToCartFailure implements Action {
    readonly type = CartActionTypes.AddToCartFailureAction;

    constructor(public payload: string) {}
}

/**
 * Reset the cart to its original state.
 */
export class CartReset implements Action {
    readonly type = CartActionTypes.CartResetAction;

    constructor() {}
}

export type CartActions = 
    | CartLoad 
    | CartLoadSuccess
    | CartLoadFailure
    | AddToCart
    | AddToCartSuccess
    | AddToCartFailure
    | CartReset;