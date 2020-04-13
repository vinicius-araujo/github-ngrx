import { createFeatureSelector } from '@ngrx/store';
import { State, routerStareKey } from './state';
import { RouterStateUrl } from 'src/app/_models/router-state-url';
import { RouterReducerState, getSelectors } from '@ngrx/router-store';

export const selectRouter = createFeatureSelector<
    State,
    RouterReducerState<RouterStateUrl>
>(routerStareKey);

export const {
    selectCurrentRoute,   // select the current route
    selectQueryParams,    // select the current route query params
    selectQueryParam,     // factory function to select a query param
    selectRouteParams,    // select the current route params
    selectRouteParam,     // factory function to select a route param
    selectRouteData,      // select the current route data
    selectUrl,            // select the current url
} = getSelectors(selectRouter);

export const selectSearchParam = selectQueryParam('search');
