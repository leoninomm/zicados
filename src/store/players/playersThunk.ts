import { collection, getDocs, getFirestore } from '@react-native-firebase/firestore';
import { fetchPlayers, fetchPlayersSuccess, fetchPlayersFailed } from './playersSlice';

import type { AppDispatch } from '../store';
import { Player } from '../../utils/types';

export const getPlayers = () => async (dispatch: AppDispatch) => {
    dispatch(fetchPlayers());

    try {
        const db = getFirestore();
        const users: any = await getDocs(collection(db, 'users'));

        console.log(users);
        const players: Player[] = [];
        users._docs.map((doc: any) => players.push(doc._data));
        console.log(players);
        dispatch(fetchPlayersSuccess(players));
    } catch (error) {
        console.log(error);
        dispatch(fetchPlayersFailed((error as Error).message));
    };
};
