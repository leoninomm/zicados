import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { OpenList } from '../../utils/types';

export interface OpenListState {
    loading: boolean;
    list: OpenList | undefined;
    fetched: boolean;
    error: string;
};

const initialState: OpenListState ={
    loading: false,
    list: undefined,
    fetched: false,
    error: '',
};

export const openListSlice = createSlice({
    name: 'openListSlice',
    initialState,
    reducers: {
        fetchOpenList: (state) => { state.loading = true },
        fetchOpenListSuccess: (state, action: PayloadAction<OpenList | undefined>) => {
            state.loading = false;
            state.list = action.payload;
            state.fetched = true;
            state.error = '';
        },
        fetchOpenListFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.list = undefined;
            state.error = action.payload;
        },
        createOpenList: (state) => { state.loading = true },
        createOpenListSuccess: (state, action: PayloadAction<OpenList>) => {
            state.loading = false;
            state.list = action.payload;
            state.error = '';
        },
        createOpenListFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.list = undefined;
            state.error = action.payload;
        },
    },
});

export const {
    fetchOpenList,
    fetchOpenListSuccess,
    fetchOpenListFailed,
    createOpenList,
    createOpenListSuccess,
    createOpenListFailed,
} = openListSlice.actions;

export default openListSlice.reducer;
