import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPlayers } from '../../../store/players/playersThunk';
import ListPlayers from '../ListPlayers';

import type { RootState, AppDispatch } from '../../../store/store';

const Absent = () => {
    const { players } = useSelector((state: RootState) => state.openListReducer);
    const { players: playersInfo } = useSelector((state: RootState) => state.playersReducer);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!playersInfo.length) dispatch(getPlayers());
    }, []);

    const willAttendPlayers = players.filter((player) => !player.willAttend);
    const willAttendPlayersIds = willAttendPlayers.map((player) => player.uid);
    const attendingPlayersIds = new Set(willAttendPlayersIds);

    const attendingPlayersInfo = playersInfo.filter((player) => attendingPlayersIds.has(player.uid));

    return (
        <ListPlayers players={attendingPlayersInfo} />
    )
};

export default Absent;
