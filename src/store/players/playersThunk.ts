import { collection, getFirestore, onSnapshot } from '@react-native-firebase/firestore';
import { fetchPlayers, fetchPlayersSuccess, fetchPlayersFailed } from './playersSlice';

import type { AppDispatch } from '../store';

export const getPlayers = () => async (dispatch: AppDispatch) => {
    dispatch(fetchPlayers());

    try {
        const db = getFirestore();

        onSnapshot(collection(db, 'users'), (snap: any) => {
            const players = snap._docs.map((doc:any) => doc._data);
            dispatch(fetchPlayersSuccess(players));
        }, (error) => { throw new Error((error as Error).message)});

    } catch (error) {
        console.log(error);
        dispatch(fetchPlayersFailed((error as Error).message));
    };
};
