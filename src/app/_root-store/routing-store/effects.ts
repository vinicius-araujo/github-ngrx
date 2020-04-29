import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as routerActions from './actions';
import { map, tap, concatMap, catchError } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(routerActions.GO),
        map((action) => routerActions.GO(action)),
        tap(({ path, query: queryParams, extras }) => {
          this.router.navigate(path, {
            queryParams,
            ...extras
          });
        })
      ),
    { dispatch: false }
  );

  navigateBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(routerActions.BACK),
        map(() => routerActions.BACK()),
        tap(() => this.location.back())
      ),
    { dispatch: false }
  );

  navigateForward$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(routerActions.FORWARD),
        map(() => routerActions.FORWARD()),
        tap(() => this.location.forward())
      ),
    { dispatch: false }
  );
}
