import { Action } from '@ngrx/store';
import { DaffNewsletterSubmission } from './../models/newsletter.model';
import { DaffNewsletterActions, DaffNewsletterActionTypes } from './../actions/newsletter.actions';

export interface DaffNewsletterState<T extends DaffNewsletterSubmission> {
  success: boolean;
  loading: boolean;
  error: string | null;
  submission: T;
}

const initialState: DaffNewsletterState<any> = {
  success: false,
  loading: false,
  error: null,
  submission: null,
}

export function reducer<T extends DaffNewsletterSubmission>(state: DaffNewsletterState<T> = initialState, action: DaffNewsletterActions<T>) {
  switch (action.type) {
    case DaffNewsletterActionTypes.NewsletterRetry:
        return {...state, loading: true, submission: action.payload};
    case DaffNewsletterActionTypes.NewsletterSubscribeAction:
      return {...state, loading: true, submission: action.payload};
    case DaffNewsletterActionTypes.NewsletterFailedSubscribeAction:
      return { ...state, loading: false, error: action.payload };
    case DaffNewsletterActionTypes.NewsletterCancelAction:
      return { ...state, loading: false};
    case DaffNewsletterActionTypes.NewsletterSuccessSubscribeAction:
        return { ...state, success: true, loading: false};
    case DaffNewsletterActionTypes.NewsletterReset:
        return {...state, ...initialState};
    default:
      return state;
  }
}