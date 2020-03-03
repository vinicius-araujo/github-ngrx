export interface State {
    results: any;
    error: string;
    query: string | null;
    loaded: boolean;
    loading: boolean;
}

export const initialState: State = {
    results: [{
        id: 'ds910ds-as8dhf',
        text: 'Vinicius'
    }],
    query: null,
    error: null,
    loaded: false,
    loading: false,
};
