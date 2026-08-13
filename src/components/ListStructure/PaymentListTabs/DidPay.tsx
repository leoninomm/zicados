import { View, Pressable, StyleSheet } from 'react-native';
import { useGetPaymentPlayers, useGetPaymentGuests } from '../../../hooks/usePlayers';
import ListContainer from '../ListContainer';
import ListRow from '../ListRow';
import TextField from '../../Textfield';
import Button from '../../Button';
import Avatar from '../../Avatar';

const DidPay = () => {
    const players = useGetPaymentPlayers(true);
    const guests = useGetPaymentGuests(true);

    return (
        <ListContainer>
            {players.map((player, i) => (
                <ListRow index={i} isLast={false} key={player.uid}>
                    <View style={Styles.player}>
                        <Avatar photo={player.photoURL} size={44} />
                        <TextField>{player.displayName}</TextField>
                    </View>
                </ListRow>
            ))}
            {guests.map((guest, i) => (
                <ListRow index={i + 1} isLast={false} key={guest.id}>
                    <TextField>{guest.guestTag}</TextField>
                </ListRow>
            ))}
        </ListContainer>
    );
};

const Styles = StyleSheet.create({
    player: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
});

export default DidPay;
