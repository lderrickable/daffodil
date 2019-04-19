import { ProductEntitiesState } from "../reducers/product-entities.reducer";
import { productAdapter, selectProductEntitiesState, selectProductIds, selectProductEntities, selectAllProducts, selectProductTotal } from "./product-entities.selectors";

describe('Product Entities Selectors', () => {
  let initialProductEntitiesState: ProductEntitiesState;

  beforeEach(() => {
    initialProductEntitiesState = productAdapter.getInitialState()
  });

  describe('selectProductEntitiesState', () => {

    it('gets the `productEntities` state slice from the root state', () => {
      const result = selectProductEntitiesState({ productEntities: initialProductEntitiesState});
      expect(result).toEqual(initialProductEntitiesState);
    });
  });

  describe('selectProductIds', () => {

    it('returns productIds state', () => {
      expect(selectProductIds.projector(initialProductEntitiesState)).toEqual([]);
    });
  });

  describe('selectProductEntities', () => {

    it('returns productEntities state', () => {
      expect(selectProductEntities.projector(initialProductEntitiesState)).toEqual({});
    });
  });
  
  describe('selectAllProducts', () => {

    it('returns allProducts state', () => {
      expect(selectAllProducts.projector(initialProductEntitiesState)).toEqual([]);
    });
  });

  describe('selectProductTotal', () => {

    it('returns productTotal state', () => {
      expect(selectProductTotal.projector(initialProductEntitiesState)).toEqual(0);
    });
  });
});
