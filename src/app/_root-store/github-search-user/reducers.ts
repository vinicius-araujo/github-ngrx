import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { initialState, State, featureAdapter } from './state';

const featureReducer = createReducer(
  initialState,
  on(featureActions.updateSearchForm, (state, { searchQuery }) => ({
    ...state,
    query: searchQuery
  })),
  on(featureActions.resetState, () => ({
    ...initialState
  })),
  on(featureActions.loadUsersRequest, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(featureActions.loadUsersSuccess, (state, { results }) =>
    featureAdapter.addAll(results.items, {
      ...state,
      loaded: true,
      loading: false,
      error: null,
      incomplete_results: results.incomplete_results,
      total_count: results.total_count
    })
  ),
  on(featureActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
