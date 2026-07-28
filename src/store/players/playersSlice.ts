import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../../utils/types';

export interface PlayersState {
    loading: boolean;
    players: Player[];
    error: string;
};

const initialState: PlayersState = {
    loading: false,
    players: [],
    error: '',
};

export const playersSlice = createSlice({
    name: 'playersSlice',
    initialState,
    reducers: {
        fetchPlayers: (state) => { state.loading = true },
        fetchPlayersSuccess: (state, action: PayloadAction<Player[]>) => {
            state.loading = false;
            state.players = action.payload;
            state.error = '';
        },
        fetchPlayersFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.players = [];
            state.error = action.payload;
        },
    },
});

export const {
    fetchPlayers,
    fetchPlayersSuccess,
    fetchPlayersFailed,
} = playersSlice.actions;

export default playersSlice.reducer;
