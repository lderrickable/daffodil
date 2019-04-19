import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers, select } from '@ngrx/store';

import { BestSellersContainer } from './best-sellers.component';
import { BestSellersLoad } from '../../actions/best-sellers.actions';
import * as fromBestSellers from '../../selectors/best-sellers.selectors';
import * as fromProductEntities from '../../selectors/product-entities.selectors';
import { Product } from '../../models/product';
import { DaffProductFactory } from '../../../testing/src';
import { bestSellersReducer } from '../../reducers/best-sellers.reducer';

describe('BestSellersContainer', () => {
  let component: BestSellersContainer;
  let fixture: ComponentFixture<BestSellersContainer>;
  let store;
  let initialLoading: boolean;
  let initialProducts: Product[];
  const productFactory = new DaffProductFactory();
  let bestSeller: Product;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          bestSellers: combineReducers(bestSellersReducer),
        })
      ],
      declarations: [ BestSellersContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSellersContainer);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    initialLoading = false;
    initialProducts = new Array(productFactory.create(), productFactory.create());
    bestSeller = initialProducts[1];

    spyOn(fromBestSellers, 'selectBestSellersLoadingState').and.returnValue(initialLoading);
    spyOn(fromProductEntities, 'selectAllProducts').and.returnValue(initialProducts);
    spyOn(fromBestSellers, 'selectBestSellersIdsState').and.returnValue([bestSeller.id]);
    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngInit', () => {
    
    it('dispatches a BestSellersLoad action', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new BestSellersLoad());
    });

    it('initializes loading$', () => {
      component.loading$.subscribe((loading) => {
        expect(loading).toEqual(initialLoading);
      });
    });

    it('sets bestSellers', () => {
      store.pipe(select(fromProductEntities.selectAllProducts)).subscribe();

      store.pipe(select(fromBestSellers.selectBestSellersIdsState)).subscribe(() => {
        expect(component.bestSellers).toEqual([bestSeller]);
      });
    });
  });
});
