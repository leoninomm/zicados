import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { OpenList, OpenListPlayer, Guest } from '../../utils/types';

export interface OpenListState {
    loading: boolean;
    list: OpenList | undefined;
    players: OpenListPlayer[];
    guests: Guest[];
    fetched: boolean;
    error: string;
};

const initialState: OpenListState ={
    loading: false,
    list: undefined,
    players: [],
    guests: [],
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
        fetchPlayers: (state) => { state.loading = true },
        fetchPlayersSuccess: (state, action: PayloadAction<OpenListPlayer[]>) => {
            state.loading = false;
            state.players = action.payload;
            state.error = '';
        },
        fetchPlayersFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.players = [];
            state.error = action.payload;
        },
        fetchGuests: (state) => { state.loading = true },
        fetchGuestsSuccess: (state, action: PayloadAction<Guest[]>) => {
            state.loading = false;
            state.guests = action.payload;
            state.error = '';
        },
        fetchGuestsFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.guests = [];
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
    fetchPlayers,
    fetchPlayersSuccess,
    fetchPlayersFailed,
    fetchGuests,
    fetchGuestsSuccess,
    fetchGuestsFailed,
    createOpenList,
    createOpenListSuccess,
    createOpenListFailed,
} = openListSlice.actions;

export default openListSlice.reducer;
