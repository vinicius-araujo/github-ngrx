import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, featureAdapter } from './state';
import { GithubUserItem } from 'src/app/_models/github-search.model';

export const getGithubUserSearchState = createFeatureSelector<State>(
    'githubUserSearch'
);

export const selectAllGithubUserSearchItems: (
    state: object
) => GithubUserItem[] = featureAdapter.getSelectors(
    getGithubUserSearchState
).selectAll;

export const getGithubUserSearchStateSuccess = createSelector(
    getGithubUserSearchState,
    selectAllGithubUserSearchItems,
    (state: State, items: any): GithubUserItem[] => items
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
