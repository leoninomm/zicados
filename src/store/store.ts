import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import preferencesReducer from './preferences/preferencesSlice';
import playersReducer from './players/playersSlice';
import openListReducer from './openList/openListSlice';
import paymentListReducer from './paymentList/paymentListSlice';

export const store = configureStore({
    reducer: {
        authReducer,
        preferencesReducer,
        playersReducer,
        openListReducer,
        paymentListReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
