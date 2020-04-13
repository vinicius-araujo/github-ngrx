// import * as fromRouter from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { State } from './state';


export const reducers: ActionReducerMap<State> = {
    router: routerReducer
};
