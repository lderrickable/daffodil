import { Injectable } from '@angular/core';

import { DaffDriverInterface } from '@daffodil/driver';
import { DaffShopifyProductService } from '@daffodil/product';
import { DaffShopifyCartService } from '@daffodil/cart';
import { DaffShopifyCheckoutService } from '@daffodil/checkout';

@Injectable({
  providedIn: 'root'
})
export class DaffShopifyDriver implements DaffDriverInterface {
  constructor(
    public productService: DaffShopifyProductService,
    public cartService: DaffShopifyCartService,
    public checkoutService: DaffShopifyCheckoutService
  ){}
}
