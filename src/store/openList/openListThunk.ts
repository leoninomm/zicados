import { getAuth } from '@react-native-firebase/auth';
import { addDoc, collection, getFirestore, onSnapshot, updateDoc, doc, getDocs, query, where } from '@react-native-firebase/firestore';
import {
    fetchOpenList,
    fetchOpenListSuccess,
    fetchOpenListFailed,
    fetchPlayers,
    fetchPlayersSuccess,
    fetchPlayersFailed,
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
        const openListRef = collection(db, FBCollections.OpenList);
        const listQuery = query(openListRef, where('isClosed', '==', false));

        onSnapshot(listQuery, async (snap: any) => {
            if (!snap._docs.length) dispatch(fetchOpenListSuccess(undefined));
            else {
                const list: OpenList = snap._docs[0]._data;
                dispatch(getOpenListPlayers(list.id));
                dispatch(fetchOpenListSuccess(list))
            };
        })
    } catch(error) {
        dispatch(fetchOpenListFailed((error as Error).message));
    }
}

export const getOpenListPlayers = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchPlayers());

    try {
        const db = getFirestore();
        const playersRef = collection(db, FBCollections.OpenList, id, 'PlayersCol');

        onSnapshot(playersRef, (snap: any) => {
            if (!snap._docs.length) dispatch(fetchPlayersSuccess([]));
            else {
                const players = snap._docs.map((doc: any) => doc._data);
                dispatch(fetchPlayersSuccess(players));
            }
        });
    } catch (error) {
        dispatch(fetchPlayersFailed((error as Error).message));
    }
};

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
