import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PaymentList, PaymentListPlayer, PaymentListGuest } from '../../utils/types';

export interface PaymentListState {
    paymentList: PaymentList| undefined,
    players: PaymentListPlayer[],
    guests: PaymentListGuest[],
    fetched: boolean,
    loading: boolean,
    error: string,
};

const initialState: PaymentListState = {
    paymentList: undefined,
    players: [],
    guests: [],
    fetched: false,
    loading: false,
    error: '',
};

export const paymentListSlice = createSlice({
    name: 'paymentListSlice',
    initialState,
    reducers: {
        fetchPaymentList: (state) => { state.loading = true },
        fetchPaymentListSuccess: (state, action: PayloadAction<PaymentList | undefined>) => {
            state.loading = false;
            state.paymentList = action.payload;
            state.fetched = true;
            state.error = '';
        },
        fetchPaymentListFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.paymentList = undefined;
            state.error = action.payload;
        },
        createPaymentList: (state) => { state.loading = true },
        createPaymentListSuccess: (state, action: PayloadAction<PaymentList>) => {
            state.loading = false;
            state.paymentList = action.payload;
            state.error = '';
        },
        createPaymentListFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.paymentList = undefined;
            state.error = action.payload;
        },
        setPaymentListPlayersStart: (state) => { state.loading = true },
        setPaymentListPlayersSuccess: (state, action: PayloadAction<{players: PaymentListPlayer[], guests: PaymentListGuest[]}>) => {
            state.loading = false;
            state.players = action.payload.players;
            state.guests = action.payload.guests;
            state.error = '';
        },
        setPaymentListPlayersFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.players = [];
            state.guests = [];
            state.error = action.payload;
        }
    },
});

export const {
    fetchPaymentList,
    fetchPaymentListSuccess,
    fetchPaymentListFailed,
    createPaymentList,
    createPaymentListSuccess,
    createPaymentListFailed,
    setPaymentListPlayersStart,
    setPaymentListPlayersSuccess,
    setPaymentListPlayersFailed,
} = paymentListSlice.actions;

export default paymentListSlice.reducer;
