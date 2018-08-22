import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';

import { Cart, CartFactory } from '@daffodil/core';

import { CartContainer } from './cart.component';
import { CartLoad } from '../../actions/cart.actions';
import * as fromCart from '../../reducers/index';

describe('CartContainer', () => {
  let component: CartContainer;
  let fixture: ComponentFixture<CartContainer>;
  let store;
  let initialLoading: boolean;
  let initialCart: Cart;
  let cartFactory = new CartFactory();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          carts: combineReducers(fromCart.reducers),
        })
      ],
      declarations: [ CartContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartContainer);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    initialLoading = false;
    initialCart = cartFactory.create();

    spyOn(fromCart, 'selectCartLoadingState').and.returnValue(initialLoading);
    spyOn(fromCart, 'selectCartValueState').and.returnValue(initialCart);
    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngInit', () => {
    
    it('dispatches a CartLoad action', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new CartLoad());
    });

    it('initializes loading$', () => {
      component.loading$.subscribe((loading) => {
        expect(loading).toEqual(initialLoading);
      });
    });

    it('initializes cart$', () => {
      component.cart$.subscribe((cart) => {
        expect(cart).toEqual(initialCart);
      });
    });
  });
});