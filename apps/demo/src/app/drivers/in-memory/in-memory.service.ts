import { Injectable } from '@angular/core';

import {
  InMemoryDbService,
  RequestInfoUtilities,
  ParsedRequestUrl
} from 'angular-in-memory-web-api';
import { Product, Cart, Order } from '@daffodil/core';

import { DaffInMemoryBackendProductService } from '@daffodil/product/testing';
import { DaffInMemoryBackendCartService } from '@daffodil/cart/testing';
import { DaffInMemoryBackendCheckoutService } from '@daffodil/checkout/testing';

@Injectable({
  providedIn: 'root'
})
export class DaffInMemoryService implements InMemoryDbService {
  constructor(
    private productBankendService: DaffInMemoryBackendProductService,
    private cartBackendService: DaffInMemoryBackendCartService,
    private checkoutBackendService: DaffInMemoryBackendCheckoutService
  ) {}

  parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
    return utils.parseRequestUrl(url);
  }

  post(reqInfo: any) {
    const collectionName = reqInfo.collectionName;
    if (collectionName === 'cart') {
      return this.cartBackendService.post(reqInfo);
    } else if (collectionName === 'checkout') {
      return this.checkoutBackendService.post(reqInfo);
    }

    return undefined;
  }

  get(reqInfo: any) {
    const collectionName = reqInfo.collectionName;
    if (collectionName === 'products') {
      return this.productBankendService.get(reqInfo);
    }
  }

  createDb(): MockDaffDatabase {
    return {
      ...this.productBankendService.createDb(),
      ...this.cartBackendService.createDb(),
      ...this.checkoutBackendService.createDb()
    };
  }
}

export interface MockDaffDatabase {
  products: Product[];
  cart: Cart;
  order: Order;
}
