import { getAuth } from '@react-native-firebase/auth';
import {
    addDoc,
    collection,
    getFirestore,
    onSnapshot,
    updateDoc,
    doc,
    setDoc,
    query,
    where,
    arrayRemove,
    arrayUnion,
} from '@react-native-firebase/firestore';
import {
    fetchPaymentList,
    fetchPaymentListSuccess,
    fetchPaymentListFailed,
    createPaymentList,
    createPaymentListSuccess,
    createPaymentListFailed,
} from './paymentListSlice';

import type { AppDispatch, RootState } from '../store';
import { FBCollections, PaymentList } from '../../utils/types';

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
}
