import { Observable } from 'rxjs';

import { Cart } from '../../models/cart';

/**
 * Interface for any Cart service drivers.
 */
export interface DaffCartServiceInterface {
  /**
   * Get cart.
   * 
   * @returns Observable<Cart>
   */
  get(): Observable<Cart>;
  /**
   * Add a product to the cart.
   * 
   * @param productId product ID
   * @param qty The quantity of the product to be added
   * @returns Observable<Cart>
   */
  addToCart(productId: string, qty: number): Observable<Cart>;
  /**
   * Clear all products from the cart.
   * 
   * @returns Observable<void>
   */
  clear(): Observable<void>;
}
