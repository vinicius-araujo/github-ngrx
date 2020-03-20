import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map } from 'rxjs/operators';
import { RootState } from '../root-state';
import * as featureActions from './actions';

@Injectable()
export class GithubUserSearchStateEffects {
    constructor(
        private store: Store<RootState>,
        private actions$: Actions,
    ) { }

    updateSearchFormEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateSearchForm),
            map(() => featureActions.loadUsersRequest())
        )
    );

    // loadUsersRequestEffect$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(featureActions.loadUsersRequest),
    //         map(() => featureActions.loadUsersRequest())
    //     )
    // );
}
