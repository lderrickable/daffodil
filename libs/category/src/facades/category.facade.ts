import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select, Action } from '@ngrx/store';

import { DaffStoreFacade } from '@daffodil/core';

import { DaffCategory } from '../models/category';
import * as fromCategory from '../reducers/index';
import { DaffCategoryModule } from '../category.module';

@Injectable({
  providedIn: DaffCategoryModule
})
export class DaffCategoryFacade implements DaffStoreFacade<Action> {
  /**
   * The category retrieved in a single category call.
   */
  category$: Observable<DaffCategory>;
  /**
   * The loading state for retrieving a single category.
   */
  loading$: Observable<boolean>;
  /**
   * Errors associated with retrieving a single category.
   */
  errors$: Observable<string[]>;

  constructor(private store: Store<fromCategory.State>) {
    this.category$ = this.store.pipe(select(fromCategory.selectCategory));
    this.loading$ = this.store.pipe(select(fromCategory.selectCategoryLoading));
    this.errors$ = this.store.pipe(select(fromCategory.selectCategoryErrors));
  }

  /**
   * Dispatches the given action.
   * @param action action to dispatch.
   */
  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
