import { DaffProductFactory } from '../../testing/src';
import { ProductGridLoad, ProductGridLoadSuccess, ProductGridLoadFailure } from "../actions/product-grid.actions";
import { initialState, productGridReducer, ProductGridState } from "../reducers/product-grid.reducer";
import { Product } from "../models/product";

describe('Product | Product Grid Reducer', () => {

  let productFactory: DaffProductFactory;
  let product: Product;

  beforeEach(() => {
    productFactory = new DaffProductFactory();

    product = productFactory.create();
  });

  describe('when an unknown action is triggered', () => {

    it('should return the current state', () => {
      const action = {} as any;

      const result = productGridReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('when ProductGridLoadAction is triggered', () => {

    it('sets loading state to true', () => {
      const productGridLoadAction: ProductGridLoad = new ProductGridLoad();
      
      const result = productGridReducer(initialState, productGridLoadAction);

      expect(result.loading).toEqual(true);
    });
  });

  describe('when ProductGridLoadSuccessAction is triggered', () => {

    let products: Product[];
    let result;
    let state: ProductGridState;

    beforeEach(() => {
      state = {
        ...initialState,
        loading: true,
      }
      products = new Array(product);
      const productGridLoadSuccess = new ProductGridLoadSuccess(products);
      
      result = productGridReducer(state, productGridLoadSuccess);
    });

    it('sets loading to false', () => {
      expect(result.loading).toEqual(false);
    });
  });

  describe('when ProductGridLoadFailureAction is triggered', () => {

    let error: string;
    let result;
    let state: ProductGridState;

    beforeEach(() => {
      state = {
        ...initialState,
        loading: true,
        errors: new Array('firstError')
      }
      
      error = 'error';      
      const productGridLoadFailure = new ProductGridLoadFailure(error);
      result = productGridReducer(state, productGridLoadFailure);
    });

    it('sets loading to false', () => {
      expect(result.loading).toEqual(false);
    });

    it('adds an error to state.errors', () => {
      expect(result.errors.length).toEqual(2);
    });
  });
});
