import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  RequestInfoUtilities,
  ParsedRequestUrl
} from 'angular-in-memory-web-api';

import { Product, Cart, Order } from '@daffodil/core';
import { DaffInMemoryCartTestingService } from '@daffodil/cart/testing';
import { DaffInMemoryProductTestingService } from '@daffodil/product/testing';
import { DaffInMemoryCheckoutTestingService } from '@daffodil/checkout/testing';

@Injectable({
  providedIn: 'root'
})
export class DaffInMemoryService implements InMemoryDbService {
  constructor(
    private productTestingService: DaffInMemoryProductTestingService,
    private cartTestingService: DaffInMemoryCartTestingService,
    private checkoutTestingService: DaffInMemoryCheckoutTestingService
  ) {}

  parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
    return utils.parseRequestUrl(url);
  }

  post(reqInfo: any) {
    const collectionName = reqInfo.collectionName;
    if (collectionName === 'cart') {
      return this.cartTestingService.post(reqInfo);
    } else if (collectionName === 'checkout') {
      return this.checkoutTestingService.post(reqInfo);
    }

    return undefined;
  }

  get(reqInfo: any) {
    const collectionName = reqInfo.collectionName;
    if (collectionName === 'products') {
      return this.productTestingService.get(reqInfo);
    }
  }

  createDb(): MockDaffDatabase {
    return {
      ...this.productTestingService.createDb(),
      ...this.cartTestingService.createDb(),
      ...this.checkoutTestingService.createDb()
    };
  }
}

export interface MockDaffDatabase {
  products: Product[];
  cart: Cart;
  order: Order;
}
