import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ProductGridLoad } from '../../actions/product-grid.actions';
import { Product } from '../../models/product';
import { ProductGridState } from '../../reducers/product-grid.reducer';
import { ProductEntitiesState } from '../../reducers/product-entities.reducer';
import { selectProductGridLoadingState } from '../../selectors/product-grid.selectors';
import { selectAllProducts } from '../../selectors/product-entities.selectors';

@Component({
  selector: '[product-grid-container]',
  template: '<ng-content></ng-content>',
  exportAs: 'ProductGridContainer'
})
export class ProductGridContainer implements OnInit {

  loading$: Observable<boolean>;
  products$: Observable<Product[]>;

  constructor(
    private productGridStore: Store<ProductGridState>,
    private productEntitiesStore: Store<ProductEntitiesState>
  ) { }

  ngOnInit() {
    this.productGridStore.dispatch(new ProductGridLoad());

    this.loading$ = this.productGridStore.pipe(select(selectProductGridLoadingState));

    this.products$ = this.productEntitiesStore.pipe(select(selectAllProducts));
  }
}
