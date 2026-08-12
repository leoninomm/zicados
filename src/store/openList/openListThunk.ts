import { getAuth } from '@react-native-firebase/auth';
import {
    addDoc,
    collection,
    getFirestore,
    onSnapshot,
    updateDoc,
    doc,
    setDoc,
    deleteDoc,
    query,
    where,
} from '@react-native-firebase/firestore';
import {
    fetchOpenList,
    fetchOpenListSuccess,
    fetchOpenListFailed,
    fetchPlayers,
    fetchPlayersSuccess,
    fetchPlayersFailed,
    fetchGuests,
    fetchGuestsSuccess,
    fetchGuestsFailed,
    createOpenList,
    createOpenListSuccess,
    createOpenListFailed,
    updateList,
    updateListSuccess,
    updateListFailed,
} from './openListSlice';

import type { AppDispatch, RootState } from '../store';
import { FBCollections, Guest, type OpenList } from '../../utils/types';

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
                dispatch(getOpenListGuests(list.id));
                dispatch(fetchOpenListSuccess(list));
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
        const playersRef = collection(db, FBCollections.OpenList, id, FBCollections.PlayersCol);

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

export const getOpenListGuests = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchGuests());

    try {
        const db = getFirestore();
        const guestsRef = collection(db, FBCollections.OpenList, id, FBCollections.GuestsCol);

        onSnapshot(guestsRef, (snap: any) => {
            console.log(snap);
            if (!snap._docs.length) {
                dispatch(fetchGuestsSuccess([]));
            } else {
                const guests = snap._docs.map((doc: any) => doc._data);
                dispatch(fetchGuestsSuccess(guests));
            }
        });
    } catch (error) {
        dispatch(fetchGuestsFailed((error as Error).message));
    };
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

export const replyToList = (reply: boolean) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();

    const listId = state.openListReducer.list?.id;
    const userId = state.authReducer.user?.uid;
    if (!listId || !userId) return;

    const db = getFirestore();
    const playerCollectionRef = collection(db, FBCollections.OpenList, listId, 'PlayersCol');
    setDoc(doc(playerCollectionRef, userId), {
        uid: userId,
        willAttend: reply,
    });
};

export const updateReply = (currentReply: boolean) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();

    const listId = state.openListReducer.list?.id;
    const userId = state.authReducer.user?.uid;
    if (!listId || !userId) return;

    const db = getFirestore();
    const playerCollectionRef = collection(db, FBCollections.OpenList, listId, 'PlayersCol');
    updateDoc(doc(playerCollectionRef, userId), {
        uid: userId,
        willAttend: !currentReply,
    });
};

export const addGuest = (guestName: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const { user } = state.authReducer;
    const { list } = state.openListReducer;

    if (user && list) {
        const db = getFirestore();

        const guestsRef = collection(db, FBCollections.OpenList, list.id, FBCollections.GuestsCol);
        const guest = {
            guestName,
            guestTag: `${guestName} (${user.displayName})`,
            playerResponsible: user.uid,
        };

        const newGuest: any = await addDoc(guestsRef, guest);
        const newGuestId = newGuest._documentPath._parts[3];

        await updateDoc(doc(guestsRef, newGuestId), {
            id: newGuestId,
        });
    }
};

export const removeGuest = (guest: Guest) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const { list } = state.openListReducer;

    if (list) {
        const db = getFirestore();
    
        const guestRef = doc(db, FBCollections.OpenList, list.id, FBCollections.GuestsCol, guest.id);
    
        await deleteDoc(guestRef);
    }
};

export const updateListInfo = (newList: Partial<OpenList>) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(updateList());
    const state = getState();
    const { list } = state.openListReducer;

    try {
        if (list) {
            const db = getFirestore();

            const listRef = doc(db, FBCollections.OpenList, list.id);
            await updateDoc(listRef, newList);

            dispatch(updateListSuccess());
        }
        return true;
    } catch (error) {
        dispatch(updateListFailed((error as Error).message));
        return false;
    };
};
