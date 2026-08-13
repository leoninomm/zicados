import { View, Pressable, StyleSheet } from 'react-native';
import { useGetPaymentPlayers, useGetPaymentGuests } from '../../../hooks/usePlayers';
import ListContainer from '../ListContainer';
import ListRow from '../ListRow';
import TextField from '../../Textfield';
import Button from '../../Button';
import Avatar from '../../Avatar';

const DidNotPay = () => {
    const players = useGetPaymentPlayers(false);
    const guests = useGetPaymentGuests(false);

    return (
        <ListContainer>
            {players.map((player, i) => (
                <ListRow index={i} isLast={false} key={player.uid}>
                    <View style={Styles.player}>
                        <Avatar photo={player.photoURL} size={44} />
                        <TextField>{player.displayName}</TextField>
                    </View>
                    <TextField>{`R$ ${player.amountOwed.toFixed(2)}`}</TextField>
                </ListRow>
            ))}
            {guests.map((guest, i) => (
                <ListRow index={i} isLast={false} key={guest.id}>
                    <TextField>{guest.guestTag}</TextField>
                    <TextField>{`R$ ${guest.amountOwed.toFixed(2)}`}</TextField>
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

export default DidNotPay;
