import {
    collection,
    getFirestore,
    onSnapshot,
    updateDoc,
    doc,
    setDoc,
    query,
    where,
} from '@react-native-firebase/firestore';
import {
    fetchPaymentList,
    fetchPaymentListSuccess,
    fetchPaymentListFailed,
    createPaymentList,
    createPaymentListSuccess,
    createPaymentListFailed,
    setPaymentListPlayersStart,
    setPaymentListPlayersSuccess,
    setPaymentListPlayersFailed,
    fetchPlayers,
    fetchPlayersSuccess,
    fetchPlayersFailed,
    fetchGuests,
    fetchGuestsSuccess,
    fetchGuestsFailed,
} from './paymentListSlice';

import type { AppDispatch, RootState } from '../store';
import { FBCollections, PaymentList, PaymentListGuest, PaymentListPlayer } from '../../utils/types';

export const getPaymentList = () => async (dispatch: AppDispatch) => {
    dispatch(fetchPaymentList());

    try {
        const db = getFirestore();
        const paymentListRef = collection(db, FBCollections.PaymentList);
        const paymentListQuery = query(paymentListRef, where('isClosed', '==', false));

        onSnapshot(paymentListQuery, async (snap: any) => {
            if (!snap._docs.length) dispatch(fetchPaymentListSuccess(undefined));
            else {
                const list: PaymentList = snap._docs[0]._data;
                dispatch(fetchPaymentListSuccess(list));
            }
        });
    } catch (error) {
        dispatch(fetchPaymentListFailed((error as Error).message));
    };
};

export const openPaymentList = (payer: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(createPaymentList());

    const state = getState();

    try {
        const { list } = state.openListReducer;
        if (!list) throw new Error('Nenhuma lista aberta');
        
        const db = getFirestore();
        const newPaymentList: PaymentList = {
            ...list,
            payer,
            paymentInfo: '',
            price: 0,
        };

        await setDoc(doc(collection(db, FBCollections.PaymentList), list.id), newPaymentList);
        await updateDoc(doc(collection(db, FBCollections.OpenList), list.id), { isClosed: true });
        dispatch(createPaymentListSuccess(newPaymentList));
    } catch (error) {
        dispatch(createPaymentListFailed((error as Error).message));
    }
};

export const setPaymentListPlayers = (
    players: PaymentListPlayer[],
    guests: PaymentListGuest[],
    paymentInfo: string,
    price: string,
) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setPaymentListPlayersStart());
    const state = getState();

    try {
        const { paymentList } = state.paymentListReducer;
    
        if (paymentList) {
            const db = getFirestore();
        
            const paymentListRef = collection(db, FBCollections.PaymentList);
            const paymentListPlayersRef = collection(db, FBCollections.PaymentList, paymentList.id, FBCollections.PlayersCol);
            const paymentListGuestsRef = collection(db, FBCollections.PaymentList, paymentList.id, FBCollections.GuestsCol);
    
            players.map((player) => {
                setDoc(doc(paymentListPlayersRef, player.uid), player);
            });
    
            guests.map((guest) => {
                setDoc(doc(paymentListGuestsRef, guest.id), guest);
            });

            await updateDoc(doc(paymentListRef, paymentList.id), {
                paymentInfo,
                price,
            });

            dispatch(setPaymentListPlayersSuccess({ players, guests }));
        } else {
            throw new Error('No payment list found');
        }
    } catch (error) {
        dispatch(setPaymentListPlayersFailed((error as Error).message));
    }
};

export const getPaymentListPlayers = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(fetchPlayers());
    const state = getState();

    try {
        const db = getFirestore();
        const { paymentList } = state.paymentListReducer;
        if (paymentList) {
            const playersRef = collection(db, FBCollections.PaymentList, paymentList.id, FBCollections.PlayersCol);
        
            onSnapshot(playersRef, (snap: any) => {
                if (!snap._docs.length) dispatch(fetchPlayersSuccess([]))
                else {
                    const players = snap._docs.map((doc: any) => doc._data);
                    dispatch(fetchPlayersSuccess(players));
                };
            });
        } else {
            throw new Error('No paymentlist found');
        }
    } catch (error) {
        dispatch(fetchPlayersFailed((error as Error).message));
    };
};

export const getPaymentListGuests = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(fetchGuests());
    const state = getState();

    try {
        const db = getFirestore();
        const { paymentList } = state.paymentListReducer;
        if (paymentList) {
            const guestsRef = collection(db, FBCollections.PaymentList, paymentList.id, FBCollections.GuestsCol);

            onSnapshot(guestsRef, (snap: any) => {
                if (!snap._docs.length) dispatch(fetchGuestsSuccess([]))
                else {
                    const guests = snap._docs.map((doc: any) => doc._data);
                    dispatch(fetchGuestsSuccess(guests));
                };
            });
        } else {
            throw new Error('No paymentlist found');
        }
    } catch (error) {
        dispatch(fetchPlayersFailed((error as Error).message));
    };
};

export const updatePlayerPaymentStatus = (player: string, newStatus: boolean) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();

    const { paymentList } = state.paymentListReducer;

    if (paymentList) {
        const db = getFirestore();

        const playerRef = doc(collection(db, FBCollections.PaymentList, paymentList.id, FBCollections.PlayersCol), player);
        await updateDoc(playerRef, {
            payed: newStatus,
        });
    };
};

export const updateGuestPaymentStatus = (guest: string, newStatus: boolean) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();

    const { paymentList } = state.paymentListReducer;

    if (paymentList) {
        const db = getFirestore();

        const guestRef = doc(collection(db, FBCollections.PaymentList, paymentList.id, FBCollections.GuestsCol), guest);
        await updateDoc(guestRef, {
            payed: newStatus,
        });
    };
};

export const closePaymentList = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();

    const { paymentList } = state.paymentListReducer;

    if (paymentList) {
        const db = getFirestore();

        const paymentListRef = doc(collection(db, FBCollections.PaymentList), paymentList.id);

        await updateDoc(paymentListRef, {
            isClosed: true,
        });
    };
};
