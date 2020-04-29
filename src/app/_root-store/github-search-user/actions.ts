import { createAction, props } from '@ngrx/store';
import { GithubSearchResults } from 'src/app/_models/github-search.model';

// SEARCH FORM;

const SEARCH_FORM = '[Search Form] Update Search Query';
const RESET_STATE = '[Search Form] Reset State';
export const updateSearchForm = createAction(
  SEARCH_FORM,
  props<{ searchQuery: string }>()
);
export const resetState = createAction(RESET_STATE);

// LOAD USERS

const LOAD_USERS = '[Users] Load Users';
const LOAD_USERS_FAIL = '[Users] Load Users Fail';
const LOAD_USERS_SUCCESS = '[Users] Load Users Success';

export const loadUsersRequest = createAction(LOAD_USERS);
export const loadUsersFailure = createAction(
  LOAD_USERS_FAIL,
  props<{ error: string }>()
);
export const loadUsersSuccess = createAction(
  LOAD_USERS_SUCCESS,
  props<{ results: GithubSearchResults }>()
);
