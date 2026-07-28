import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayers } from '../../store/players/playersThunk';
import TextField from '../../components/Textfield';
import InnerScreenContainer from '../../components/ScreenContainers/InnerScreenContainer';
import Avatar from '../../components/Avatar';
import BirthdayCake from '../../components/Icons/BirthdayCake';

import type { AppDispatch, RootState } from '../../store/store';

const Players = () => {
    const { players } = useSelector((state: RootState) => state.playersReducer);
    const dispatch = useDispatch<AppDispatch>();
    
    if (!players.length) dispatch(getPlayers());

    return (
        <InnerScreenContainer>
            <View style={Styles.content}>
                {players.map((player) => (
                    <View style={Styles.playerCard} key={player.uid}>
                        <View style={Styles.user}>
                            <Avatar size={52} photo={player.photoURL} />
                            <TextField>{player.displayName}</TextField>
                        </View>
                        <View style={Styles.birthday}>
                            <TextField>{player.birthday}</TextField>
                            <BirthdayCake />
                        </View>
                    </View>
                ))}
            </View>
        </InnerScreenContainer>
    );
};

const Styles = StyleSheet.create({
    content: {
        gap: 16,
        marginTop: 80,
        width: '100%',
    },
    playerCard: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FAFBFB',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#3E9618',
    },
    user: {
        gap: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    birthday: {
        gap: 8,
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default Players;
