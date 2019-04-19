import { BestSellersState } from '../reducers/best-sellers.reducer';
import { selectBestSellersState, selectBestSellersLoadingState, selectBestSellersIdsState } from './best-sellers.selectors';

describe('Best Sellers Selectors', () => {
  let initialBestSellersState: BestSellersState;

  beforeEach(() => {
    initialBestSellersState = {
      productIds: [],
      loading: false,
      errors: []
    };
  });

  describe('selectBestSellersState', () => {

    it('gets the `bestSellers` state slice from the root state', () => {
      const result = selectBestSellersState({ bestSellers: initialBestSellersState});
      expect(result).toEqual(initialBestSellersState);
    });
  });

  describe('selectBestSellersLoadingState', () => {

    it('returns loading state', () => {
      expect(selectBestSellersLoadingState.projector(initialBestSellersState)).toEqual(false);
    });
  });

  describe('selectBestSellersIdsState', () => {

    it('returns productIds state', () => {
      expect(selectBestSellersIdsState.projector(initialBestSellersState)).toEqual([]);
    });
  });
});
