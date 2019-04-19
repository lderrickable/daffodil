import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProductGridEffects } from './effects/product-grid.effects';
import { ProductEffects } from './effects/product.effects';
import { BestSellersEffects } from './effects/best-seller.effects';
import { productReducer } from './reducers/product.reducer';
import { productGridReducer } from './reducers/product-grid.reducer';
import { productEntitiesReducer } from './reducers/product-entities.reducer';
import { bestSellersReducer } from './reducers/best-sellers.reducer';
@NgModule({
  imports: [
      StoreModule.forFeature('product', productReducer),
      StoreModule.forFeature('productGrid', productGridReducer),
      StoreModule.forFeature('productEntities', productEntitiesReducer),
      StoreModule.forFeature('bestSellers', bestSellersReducer),
      EffectsModule.forFeature([
        ProductGridEffects,
        ProductEffects,
        BestSellersEffects
      ]),
  ]
})
export class StateProductStateModule { }
