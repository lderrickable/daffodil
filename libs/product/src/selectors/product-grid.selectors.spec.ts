import { ProductGridState } from '../reducers/product-grid.reducer';
import { selectProductGridState, selectProductGridLoadingState } from './product-grid.selectors';

describe('Product Grid Selectors', () => {
  let initialProductGridState: ProductGridState;

  beforeEach(() => {
    initialProductGridState = {
      products: [],
      loading: false,
      errors: []
    };
  });

  describe('selectProductGridState', () => {

    it('gets the `productGrid` state slice from the root state', () => {
      const result = selectProductGridState({ productGrid: initialProductGridState});
      expect(result).toEqual(initialProductGridState);
    });
  });

  describe('selectProductGridLoadingState', () => {

    it('returns loading state', () => {
      expect(selectProductGridLoadingState.projector(initialProductGridState)).toEqual(false);
    });
  });
});
