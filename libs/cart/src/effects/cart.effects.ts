import { Injectable, Inject } from '@angular/core';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of , Observable } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { 
  CartActionTypes, 
  CartLoad, 
  CartLoadSuccess, 
  CartLoadFailure, 
  AddToCartSuccess,
  AddToCartFailure,
  AddToCart} from '../actions/cart.actions';
import { DaffCartDriver } from '../drivers/injection-tokens/cart-driver.token';
import { DaffCartServiceInterface } from '../drivers/interfaces/cart-service.interface';

/**
 * Effects for handling cart actions and cart service requests.
 * 
 * @param action$ - Redux action object
 * @param driver - A cart service driver
 */
@Injectable()
export class CartEffects {

  constructor(
    private actions$: Actions,
    @Inject(DaffCartDriver) private driver: DaffCartServiceInterface) {}

  /**
   * Makes a get cart service call when a CartLoadAction action is triggered.
   * 
   * @returns An Observable of a CartAction
   */
  @Effect()
  load$ : Observable<any> = this.actions$.pipe(
    ofType(CartActionTypes.CartLoadAction),
    switchMap((action: CartLoad) =>
      this.driver.get()
        .pipe(
          map((resp) => {
            return new CartLoadSuccess(resp);
          }),
          catchError(error => {
            return of(new CartLoadFailure("Failed to load cart"));
          })
        )
    )
  )

  /**
   * Makes an addToCart service call when an AddToCartAction is triggered.
   * 
   * @returns An Observable of a CartAction
   */
  @Effect()
  addToCart$ = this.actions$.pipe(
    ofType(CartActionTypes.AddToCartAction),
    switchMap((action: AddToCart) =>
      this.driver.addToCart(action.payload.productId, action.payload.qty)
        .pipe(
          map((resp) => {
            return new AddToCartSuccess(resp);
          }),
          catchError(error => {
            return of(new AddToCartFailure("Failed to add item to cart"));
          })
        )
    )
  )
}
