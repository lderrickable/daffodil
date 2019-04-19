import { Component, OnInit } from '@angular/core';
import { Observable ,  combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { BestSellersLoad } from '../../actions/best-sellers.actions';
import { Product } from '../../models/product';
import { ProductEntitiesState } from '../../reducers/product-entities.reducer';
import { BestSellersState } from '../../reducers/best-sellers.reducer';
import { selectBestSellersLoadingState, selectBestSellersIdsState } from '../../selectors/best-sellers.selectors';
import { selectAllProducts } from '../../selectors/product-entities.selectors';

@Component({
  selector: '[best-sellers-container]',
  template: '<ng-content></ng-content>',
  exportAs: 'BestSellersContainer'
})
export class BestSellersContainer implements OnInit {

  loading$: Observable<boolean>;
  bestSellers: Product[];

  constructor(
    private productEntitesStore: Store<ProductEntitiesState>,
    private bestSellersStore: Store<BestSellersState>
  ) { }

  ngOnInit() {
    this.bestSellersStore.dispatch(new BestSellersLoad());

    this.loading$ = this.bestSellersStore.pipe(select(selectBestSellersLoadingState));

    combineLatest(
      this.getProducts(), this.getBestSellersIds()
    ).subscribe(([products, bestSellersIds]) => {
      this.bestSellers = [];

      bestSellersIds.forEach(id => {
        products.forEach(product => {
          if (product.id === id) {
            this.bestSellers.push(product);
          }
        });
      });
    });
  }

  private getProducts(): Observable<Product[]> {
    return this.productEntitesStore.pipe(select(selectAllProducts));
  }

  private getBestSellersIds(): Observable<string[]> {
    return this.bestSellersStore.pipe(select(selectBestSellersIdsState));
  }
}
