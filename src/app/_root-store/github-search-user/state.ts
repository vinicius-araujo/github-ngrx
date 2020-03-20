import { createEntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter = createEntityAdapter<any>({
    selectId: model => model.id
});

export interface State extends EntityState<any> {
    results: any[];
    error: string;
    query: string | null;
    loaded: boolean;
    loading: boolean;
}

export const initialState: State = featureAdapter.getInitialState({
    results: [],
    query: null,
    error: null,
    loaded: false,
    loading: false,
});
