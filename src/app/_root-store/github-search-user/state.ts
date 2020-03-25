import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { GithubUserItem } from 'src/app/_models/github-search.model';

export const featureAdapter = createEntityAdapter<GithubUserItem>({
    selectId: model => model.id
});

export interface State extends EntityState<GithubUserItem> {
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
