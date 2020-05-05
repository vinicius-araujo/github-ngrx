import * as fromReducers from './reducers';
import * as fromActions from './actions';
import * as fromState from './state';
import * as fromSelectors from './selectors';
import {
  GithubSearchResults,
  GithubUserItem
} from 'src/app/_models/github-search.model';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { RootState } from '../root-state';

describe('Reducers and States', () => {
  it('should return the default State from a undefined Reducer', () => {
    const { initialState } = fromState;
    const action = {} as any;
    const state = fromReducers.reducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should call [Reset State] and change State', () => {
    const { initialState } = fromState;
    const action = fromActions.resetState();
    const state = fromReducers.reducer(initialState, action);

    expect(state.query).toBe(null);
    expect(state.loaded).toBe(false);
    expect(state.loading).toBe(false);
  });

  it('should call [Update Search Query] and change State.query', () => {
    const { initialState } = fromState;
    const action = fromActions.updateSearchForm({ searchQuery: 'Teste' });
    const state = fromReducers.reducer(initialState, action);

    expect(state.query).toBe('Teste');
  });

  it('should call [Load Jokes] and change State.loading', () => {
    const { initialState } = fromState;
    const action = fromActions.loadUsersRequest();
    const state = fromReducers.reducer(initialState, action);
    expect(state.loading).toBeTruthy();
  });

  it('should call [Load Jokes Success]', () => {
    const users: GithubSearchResults = {
      incomplete_results: false,
      total_count: 1,
      items: [
        {
          id: 12346,
          login: 'John Doe',
          avatar_url: 'hello-world',
          html_url: 'hello-world'
        } as GithubUserItem
      ]
    };
    const { initialState } = fromState;
    const action = fromActions.loadUsersSuccess({ results: users });
    const state = fromReducers.reducer(initialState, action);
    expect(state.entities).toBeDefined();
    expect(state.ids).toEqual([users.items[0].id]);
  });

  it('should call [Load Jokes Failure] and change State.error', () => {
    const { initialState } = fromState;
    const action = fromActions.loadUsersFailure({ error: '404 not found' });
    const state = fromReducers.reducer(initialState, action);
    expect(state.error).toBe('404 not found');
  });
});

describe('Selectors', () => {
  let store: Store<RootState>;
  const users: GithubSearchResults = {
    incomplete_results: false,
    total_count: 1,
    items: [
      {
        id: 12346,
        login: 'John Doe',
        avatar_url: 'hello-world',
        html_url: 'hello-world'
      } as GithubUserItem
    ]
  };
  const entities = { 12346: users.items[0] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('githubUserSearch', fromReducers.reducer)
      ]
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should return the results from a Selector [getGithubUserSearchStateSuccess]', () => {
    let result: any;

    store
      .select(fromSelectors.getGithubUserSearchStateSuccess)
      .subscribe((value) => {
        result = value;
      });
    expect(result).toEqual([]);
    store.dispatch(fromActions.loadUsersSuccess({ results: users }));
    expect(result[0]).toEqual(entities['12346']);
  });

  it('should return the results from a Selector [getGithubUserSearchStateQuery]', () => {
    let result: any;

    store
      .select(fromSelectors.getGithubUserSearchStateQuery)
      .subscribe((value) => {
        result = value;
      });
    expect(result).toEqual(null);
    store.dispatch(fromActions.updateSearchForm({ searchQuery: 'hello' }));
    expect(result).toEqual('hello');
  });

  it('should return the results from a Selector [getGithubUserSearchStateError]', () => {
    let result: any;

    store
      .select(fromSelectors.getGithubUserSearchStateError)
      .subscribe((value) => {
        result = value;
      });
    expect(result).toEqual(null);
    store.dispatch(fromActions.loadUsersFailure({ error: '404' }));
    expect(result).toEqual('404');
  });

  it('should return the results from a Selector [getGithubUserSearchStateLoading]', () => {
    let result: any;

    store
      .select(fromSelectors.getGithubUserSearchStateLoading)
      .subscribe((value) => {
        result = value;
      });
    expect(result).toEqual(false);
    store.dispatch(fromActions.loadUsersRequest());
    expect(result).toEqual(true);
  });

  it('should return the results from a Selector [getGithubUserSearchStateLoaded]', () => {
    let result: any;

    store
      .select(fromSelectors.getGithubUserSearchStateLoaded)
      .subscribe((value) => {
        result = value;
      });
    expect(result).toEqual(false);
    store.dispatch(fromActions.loadUsersSuccess({ results: users }));
    expect(result).toEqual(true);
  });
});
