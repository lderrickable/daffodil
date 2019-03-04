import { Injectable } from '@angular/core';

import { DaffDriverInterface } from '@daffodil/driver';

import { DaffInMemoryProductService } from '@daffodil/product/testing';
import { DaffInMemoryCartService } from '@daffodil/cart/testing';
import { DaffInMemoryCheckoutService } from '@daffodil/checkout/testing';

@Injectable({
    providedIn: 'root'
})
export class DaffInMemoryDriver implements DaffDriverInterface {
    constructor(
        public productService: DaffInMemoryProductService,
        public cartService: DaffInMemoryCartService,
        public checkoutService: DaffInMemoryCheckoutService
    ){}
}
