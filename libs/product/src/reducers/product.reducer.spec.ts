import { 
  initialState, 
  productReducer, 
  ProductState
} from "../reducers/product.reducer";
import { ProductLoad, ProductLoadSuccess, ProductLoadFailure, UpdateQty } from "../actions/product.actions";
import { Product } from "../models/product";
import { DaffProductFactory } from '../../testing/src';

describe('Product | Product Reducer', () => {

  let productFactory: DaffProductFactory;
  let product: Product;
  let productId: string;

  beforeEach(() => {
    productFactory = new DaffProductFactory();

    product = productFactory.create();
    productId = product.id;
  });

  describe('when an unknown action is triggered', () => {

    it('should return the current state', () => {
      const action = {} as any;

      const result = productReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('when ProductLoadAction is triggered', () => {
    let result;

    beforeEach(() => {
      const productLoadAction: ProductLoad = new ProductLoad(productId);

      result = productReducer(initialState, productLoadAction);
    });

    it('sets loading state to true', () => {
      expect(result.loading).toEqual(true);
    });

    it('sets selectedProductId to the product id', () => {
      expect(result.selectedProductId).toEqual(productId);
    });
  });

  describe('when ProductLoadSuccessAction is triggered', () => {

    let result;
    let state: ProductState;

    beforeEach(() => {
      state = {
        ...initialState,
        loading: true
      }

      const productLoadSuccess = new ProductLoadSuccess(product);
      result = productReducer(state, productLoadSuccess);
    });

    it('sets loading to false', () => {
      expect(result.loading).toEqual(false);
    });
  });

  describe('when ProductLoadFailureAction is triggered', () => {

    const error = 'error message';
    let result;
    let state: ProductState;

    beforeEach(() => {
      state = {
        ...initialState,
        loading: true,
        errors: new Array('firstError')
      }

      const productLoadFailure = new ProductLoadFailure(error);

      result = productReducer(state, productLoadFailure);
    });

    it('sets loading to false', () => {
      expect(result.loading).toEqual(false);
    });

    it('adds an error to state.errors', () => {
      expect(result.errors.length).toEqual(2);
    });
  });

  describe('when UpdateQtyAction is triggered', () => {

    let givenQty: number;
    let result;

    beforeEach(() => {
      givenQty = 3;
      const productLoadFailure = new UpdateQty(givenQty);

      result = productReducer(initialState, productLoadFailure);
    });

    it('sets qty to payload', () => {
      expect(result.qty).toEqual(givenQty);
    });
  });
});
