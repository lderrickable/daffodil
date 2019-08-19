import { DaffCategoryActionTypes, DaffCategoryActions } from '../actions/category.actions';
import { DaffCategory } from '../models/category';

export interface State {
  category: DaffCategory,
  loading: boolean,
  errors: string[]
}

export const initialState: State = {
  category: null,
  loading: false,
  errors: []
};

export function reducer(state = initialState, action: DaffCategoryActions): State {
  switch (action.type) {
    case DaffCategoryActionTypes.CategoryLoadAction:
      return {...state, loading: true};
    case DaffCategoryActionTypes.CategoryLoadSuccessAction:
      return {...state, loading: false, category: action.payload};
    case DaffCategoryActionTypes.CategoryLoadFailureAction:
      return {...state, 
        loading: false, 
        errors: state.errors.concat(new Array(action.payload))
      };
    default:
      return state;
  }
}

export const getCategoryLoading = (state: State) => state.loading;

export const getCategoryErrors = (state: State) => state.errors;
