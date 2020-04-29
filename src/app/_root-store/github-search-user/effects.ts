import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, withLatestFrom, concatMap, catchError } from 'rxjs/operators';
import { RootState } from '../root-state';
import * as featureActions from './actions';
import * as routerActions from '../routing-store/actions';
import { GithubUsersService } from 'src/app/_services/github-users.service';
import { GithubUserSearchSelectors } from '.';
import { of } from 'rxjs';

@Injectable()
export class GithubUserSearchStateEffects {
  constructor(
    private githubService: GithubUsersService,
    private store: Store<RootState>,
    private actions$: Actions
  ) {}

  updateSearchFormEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.updateSearchForm),
      map(() => featureActions.loadUsersRequest())
    )
  );

  resetSearchFormEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.resetState),
      map(() =>
        routerActions.GO({
          path: ['/']
        })
      )
    )
  );

  searchFormSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.loadUsersRequest),
      withLatestFrom(
        this.store.select(
          GithubUserSearchSelectors.getGithubUserSearchStateQuery
        )
      ),
      map(([_, query]) =>
        routerActions.GO({
          path: ['/list'],
          query: { q: query }
        })
      )
    )
  );

  loadUsersRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.loadUsersRequest),
      withLatestFrom(
        this.store.select(
          GithubUserSearchSelectors.getGithubUserSearchStateQuery
        )
      ),
      concatMap(([_, query]) =>
        this.githubService.getUserList(query).pipe(
          map((results) =>
            featureActions.loadUsersSuccess({
              results
            })
          ),
          catchError((error) =>
            of(
              featureActions.loadUsersFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );
}
