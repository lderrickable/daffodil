import { TestBed } from "@angular/core/testing";
import { StoreModule, combineReducers, Store, select } from "@ngrx/store";

import { DaffCategoryFactory } from '@daffodil/category/testing';

import { DaffCategoryLoadSuccess } from "../actions/category.actions";
import * as fromCategory from './index';
import { DaffCategory } from "../models/category";

describe('selectCategoryState', () => {

  let store: Store<fromCategory.State>;
  const categoryFactory: DaffCategoryFactory = new DaffCategoryFactory();
  let mockCategory: DaffCategory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          category: combineReducers(fromCategory.reducers),
        })
      ]
    });

    mockCategory = categoryFactory.create();
    store = TestBed.get(Store);

    store.dispatch(new DaffCategoryLoadSuccess(mockCategory));
  });

  describe('selectCategoryState', () => {

    describe('selectCategory', () => {

      it('selects the category state', () => {
        store.pipe(select(fromCategory.selectCategory)).subscribe((categoryState) => {
          expect(categoryState).toEqual(mockCategory);
        });
      });
    });

    describe('selectCategoryLoading', () => {

      it('selects the loading state of the category', () => {
        store.pipe(select(fromCategory.selectCategoryLoading)).subscribe((categoryLoadingState) => {
          expect(categoryLoadingState).toEqual(false);
        });
      });
    });

    describe('selectCategoryErrors', () => {

      it('returns the selected category id', () => {
        store.pipe(select(fromCategory.selectCategoryErrors)).subscribe((categoryErrors) => {
          expect(categoryErrors).toEqual([]);
        });
      });
    });
  });
});
