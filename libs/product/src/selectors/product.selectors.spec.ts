import { ProductState } from '../reducers/product.reducer';
import { selectProductId, selectProductState, selectProductQty, selectProductLoadingState, selectSelectedProduct } from './product.selectors';

describe('Product Selectors', () => {
  let initialProductState: ProductState;

  beforeEach(() => {
    initialProductState = {
      selectedProductId: null,
      qty: 1,
      loading: false,
      errors: []
    };
  });

  describe('selectProductState', () => {

    it('gets the `product` state slice from the root state', () => {
      const result = selectProductState({ product: initialProductState});
      expect(result).toEqual(initialProductState);
    });
  });

  describe('selectProductId', () => {

    it('returns selectedProductId state', () => {
      expect(selectProductId.projector(initialProductState)).toEqual(null);
    });
  });

  describe('selectProductQty', () => {

    it('returns qty state', () => {
      expect(selectProductQty.projector(initialProductState)).toEqual(1);
    });
  });
  
  describe('selectProductLoadingState', () => {

    it('returns loading state', () => {
      expect(selectProductLoadingState.projector(initialProductState)).toEqual(false);
    });
  });

  describe('selectSelectedProduct', () => {

    it('returns the selected product state', () => {
      let firstProduct = 'product1';
      let secondProduct = 'product2';

      expect(selectSelectedProduct.projector({entities: [ firstProduct, secondProduct ]}, 1)).toEqual(secondProduct);
    });
  });
});
