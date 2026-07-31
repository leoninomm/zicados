import { useSelector } from 'react-redux';

import type { RootState } from '../store/store';

export const useGetPlayers = (willAttend: boolean) => {
    const { players } = useSelector((state: RootState) => state.openListReducer);
    const { players: playersInfo } = useSelector((state: RootState) => state.playersReducer);

    const filteredPlayers = players.filter((player) => player.willAttend === willAttend);

    const filteredPlayersIds = filteredPlayers.map((player) => player.uid);
    const filteredPlayersIdSet = new Set(filteredPlayersIds);

    const listPlayers = playersInfo.filter((player) => filteredPlayersIdSet.has(player.uid));

    return listPlayers;
};

export const useGetGuests = () => {
    const { guests } = useSelector((state: RootState) => state.openListReducer);
    const { players } = useSelector((state: RootState) => state.playersReducer);

    if (!guests.length) return [];
    const listGuests = guests.map((guest) => {
        const playerResponsibleInfo = players.find((player) => player.uid === guest.playerResponsible);
        if (!playerResponsibleInfo) return { ...guest, guestTag: guest.guestName };

        const playerName = playerResponsibleInfo.displayName;
        return { ...guest, guestTag: `${guest.guestName} (${playerName})` };
    });

    return listGuests;
};

export const useHasReplied = () => {
    const { players } = useSelector((state: RootState) => state.openListReducer);
    const { user} = useSelector((state: RootState) => state.authReducer);

    let hasReplied = false;
    if (user) {
        const userPlayer = players.find((player) => player.uid === user.uid);
        if (userPlayer) hasReplied = true;
    };

    return hasReplied;
};

export const useStats = () => {
    const { players } = useSelector((state: RootState) => state.openListReducer);
    const { guests } = useSelector((state: RootState) => state.openListReducer);

    const attendingPlayers = players.filter((player) => player.willAttend);
    const absentPlayers = players.filter((player) => !player.willAttend);

    const totalAttending = attendingPlayers.length + guests.length;
    const totalAbsent = absentPlayers.length;
    const totalReplies = attendingPlayers.length + absentPlayers.length;

    return { totalAbsent, totalAttending, totalReplies };
};

export const useIsOwner = () => {
    const { user } = useSelector((state: RootState) => state.authReducer);
    const { list } = useSelector((state: RootState) => state.openListReducer);

    return user?.uid === list?.owner;
}
