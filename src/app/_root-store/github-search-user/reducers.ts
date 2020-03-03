import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
    initialState,
    on(featureActions.updateSearchForm, (state, { searchQuery }) => ({
        ...state,
        query: searchQuery
    })),
    on(featureActions.loadUsersRequest, state => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(featureActions.loadUsersSuccess, (state, { results }) => ({
        ...state,
        results,
        loading: false,
        loaded: true,
        error: null
    })),
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
