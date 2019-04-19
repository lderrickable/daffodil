import { BestSellersLoad, BestSellersLoadSuccess, BestSellersLoadFailure, BestSellersReset } from "../actions/best-sellers.actions";
import { initialState, bestSellersReducer, BestSellersState } from "../reducers/best-sellers.reducer";
import { Product } from "../models/product";
import { DaffProductFactory } from '../../testing/src';

describe('Product | Best Sellers Reducer', () => {

  let productFactory: DaffProductFactory;
  let product: Product;

  beforeEach(() => {
    productFactory = new DaffProductFactory();

    product = productFactory.create();
  });

  describe('when an unknown action is triggered', () => {

    it('should return the current state', () => {
      const action = {} as any;

      const result = bestSellersReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('when BestSellersLoadAction is triggered', () => {

    it('sets loading state to true', () => {
      const productsLoadAction: BestSellersLoad = new BestSellersLoad();
      
      const result = bestSellersReducer(initialState, productsLoadAction);

      expect(result.loading).toEqual(true);
    });
  });

  describe('when BestSellersLoadSuccessAction is triggered', () => {

    let products: Product[];
    let result;
    let state: BestSellersState;

    beforeEach(() => {
      state = {
        ...initialState,
        loading: true
      }
  
      products = new Array(product);
      const productsLoadSuccess = new BestSellersLoadSuccess(products);
      
      result = bestSellersReducer(state, productsLoadSuccess);
    });

    it('sets loading to false', () => {
      expect(result.loading).toEqual(false);
    });

    it('should set productIds to ids of payload products', () => {
      expect(result.productIds).toEqual([product.id]);
    });
  });

  describe('when BestSellersLoadFailureAction is triggered', () => {

    let error: string;
    let result;
    let state: BestSellersState;

    beforeEach(() => {
      state = {
        ...initialState,
        loading: true,
        errors: new Array('firstError'),
      }
      error = 'error';      
      const productsLoadFailure = new BestSellersLoadFailure(error);

      result = bestSellersReducer(state, productsLoadFailure);
    });

    it('sets loading to false', () => {
      expect(result.loading).toEqual(false);
    });

    it('adds an error to state.errors', () => {
      expect(result.errors.length).toEqual(2);
    });
  });

  describe('BestSellersReset', () => {
    
    it('resets state to initialState', () => {
      const expectedState = {
        loading: false,
        productIds: [],
        errors: []
      }
      const bestSellersReset = new BestSellersReset();
      const result = bestSellersReducer(initialState, bestSellersReset);
      
      expect(result).toEqual(expectedState);
    });
  });
});
