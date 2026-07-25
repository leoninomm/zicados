import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import preferencesReducer from './preferences/preferencesSlice';

export const store = configureStore({
    reducer: {
        authReducer,
        preferencesReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
