import { getAuth } from '@react-native-firebase/auth';
import { addDoc, collection, getFirestore, onSnapshot, updateDoc, doc } from '@react-native-firebase/firestore';
import {
    fetchOpenList,
    fetchOpenListSuccess,
    fetchOpenListFailed,
    createOpenList,
    createOpenListSuccess,
    createOpenListFailed,
} from './openListSlice';

import type { AppDispatch } from '../store';
import { FBCollections, type OpenList } from '../../utils/types';

export const getOpenList = () => async (dispatch: AppDispatch) => {
    dispatch(fetchOpenList());

    try {
        const db = getFirestore();
        onSnapshot(collection(db, 'openList'), (snap: any) => {
            console.log(snap);
            const list: OpenList = snap._docs[0]._data;
            console.log(list);
            if (list.isClosed) dispatch(fetchOpenListSuccess(undefined));
            else dispatch(fetchOpenListSuccess(list));
        })
    } catch(error) {
        dispatch(fetchOpenListFailed((error as Error).message));
    }
}

export const openList = (list: Omit<OpenList, 'owner' | 'id'>) => async (dispatch: AppDispatch) => {
    dispatch(createOpenList());

    try {
        const auth = getAuth();
        if (auth.currentUser) {
            const db = getFirestore();
            const newList: any = await addDoc(collection(db, FBCollections.OpenList), list);
            const newListId = newList._documentPath._parts[1];

            await updateDoc(doc(collection(db, FBCollections.OpenList), newListId), {
                id: newListId,
                owner: auth.currentUser.uid,
            });

            const newOpenList = {
                ...list,
                id: newListId,
                owner: auth.currentUser.uid,
            };

            dispatch(createOpenListSuccess(newOpenList));
        }
    } catch (error) {
        dispatch(createOpenListFailed((error as Error).message));
    }
};
