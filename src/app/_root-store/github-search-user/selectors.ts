import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './state';

export const getGithubUserSearchState = createFeatureSelector<State>(
    'githubUserSearch'
);

export const getGithubUserSearchStateResult = createSelector(
    getGithubUserSearchState,
    (state: State): any[] => state.results
);

export const getGithubUserSearchStateQuery = createSelector(
    getGithubUserSearchState,
    (state: State): string => state.query
);

export const getGithubUserSearchStateError = createSelector(
    getGithubUserSearchState,
    (state: State): any => state.error
);

export const getGithubUserSearchStateLoading = createSelector(
    getGithubUserSearchState,
    (state: State): boolean => state.loading
);

export const getGithubUserSearchStateLoaded = createSelector(
    getGithubUserSearchState,
    (state: State): boolean => state.loaded
);
