import { createSlice } from '@reduxjs/toolkit';

export interface PreferencesState {
    theme: 'LIGHT' | 'DARK'
};

const initialState: PreferencesState = {
    theme: 'LIGHT',
};

export const preferencesSlice = createSlice({
    name: 'preferencesReducer',
    initialState,
    reducers: {
        switchTheme: (state) => {
            if (state.theme === 'LIGHT') state.theme = 'DARK';
            state.theme = 'LIGHT';
        }
    }
});

export const {
    switchTheme
} = preferencesSlice.actions;

export default preferencesSlice.reducer
