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
            throw new Error('Payment list not found');
        }
    } catch (error) {
        dispatch(setPaymentListPlayersFailed((error as Error).message));
    }
};
