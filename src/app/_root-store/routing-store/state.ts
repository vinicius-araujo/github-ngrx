import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from 'src/app/_models/router-state-url';

export const routerStareKey = 'router';

export interface State {
    'router': RouterReducerState<RouterStateUrl>;
}

