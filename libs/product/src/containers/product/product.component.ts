import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ProductLoad, UpdateQty } from '../../actions/product.actions';
import { Product } from '../../models/product';
import { ProductState } from '../../reducers/product.reducer';
import { selectSelectedProduct, selectProductLoadingState, selectProductQty } from '../../selectors/product.selectors';

@Component({
  selector: '[product-container]',
  template: '<ng-content></ng-content>',
  exportAs: 'ProductContainer'
})
export class ProductContainer implements OnInit {

  @Input() selectedProductId: string;

  loading$: Observable<boolean>;
  product$: Observable<Product>;
  qty$: Observable<number>;

  constructor(
    private store: Store<ProductState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new ProductLoad(this.selectedProductId));

    this.loading$ = this.store.pipe(select(selectProductLoadingState));

    this.product$ = this.store.pipe(select(selectSelectedProduct));

    this.qty$ = this.store.pipe(select(selectProductQty));
  }

  updateQty(payload: number) {
    this.store.dispatch(new UpdateQty(payload));
  }
}
