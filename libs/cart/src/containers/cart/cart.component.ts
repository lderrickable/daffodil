import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromCart from '../../reducers/index';
import { CartLoad, AddToCart } from '../../actions/cart.actions';
import { Cart } from '../../models/cart';

/**
 * A component for attaching cart data to an application view.
 * 
 * @param store - A redux store of a Cart.
 */
@Component({
  selector: '[cart-container]',
  template: '<ng-content></ng-content>',
  exportAs: 'CartContainer'
})
export class CartContainer implements OnInit {

  loading$: Observable<boolean>;
  cart$: Observable<Cart>;

  constructor(
    private store: Store<fromCart.State>
  ) { }

  /**
   * An angular lifecycle method.
   */
  ngOnInit() {
    this.store.dispatch(new CartLoad());

    this.loading$ = this.store.pipe(select(fromCart.selectCartLoadingState));
    this.cart$ = this.store.pipe(select(fromCart.selectCartValueState));
  }

  /**
   * Add a product to the cart.
   * 
   * @param payload - { "productId": string, "qty": number }
   */
  addToCart(payload) {
    this.store.dispatch(new AddToCart(payload));
  }
}
