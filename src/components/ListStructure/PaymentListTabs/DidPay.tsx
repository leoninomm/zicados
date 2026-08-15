import { useContext } from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { PaymentListContext } from '../../../contexts/PaymentListContext';
import { updatePlayerPaymentStatus, updateGuestPaymentStatus } from '../../../store/paymentList/paymentListThunk';
import { useGetPaymentPlayers, useGetPaymentGuests, useIsPayer } from '../../../hooks/usePlayers';
import ListContainer from '../ListContainer';
import ListRow from '../ListRow';
import TextField from '../../Textfield';
import Button from '../../Button';
import Avatar from '../../Avatar';
import CoinX from '../../../assets/coin-x.png';

import type { AppDispatch } from '../../../store/store';

const DidPay = () => {
    const players = useGetPaymentPlayers(true);
    const guests = useGetPaymentGuests(true);
    const isPayer = useIsPayer();
    const { setCurrentTab } = useContext(PaymentListContext);

    const dispatch = useDispatch<AppDispatch>();

    const handleContestPayment = (player: string, isGuest: boolean) => {
        if (isGuest) dispatch(updateGuestPaymentStatus(player, false));
        else dispatch(updatePlayerPaymentStatus(player, false));

        setCurrentTab(0);
    }

    return (
        <ListContainer>
            {players.map((player, i) => (
                <ListRow index={i} isLast={false} key={player.uid}>
                    <View style={Styles.player}>
                        <Avatar photo={player.photoURL} size={44} />
                        <TextField>{player.displayName}</TextField>
                    </View>
                    {isPayer && (
                        <Pressable onPress={() => handleContestPayment(player.uid, false)}>
                            <Image source={CoinX} style={Styles.icon} />
                        </Pressable>
                    )}
                </ListRow>
            ))}
            {guests.map((guest, i) => (
                <ListRow index={i + 1} isLast={false} key={guest.id}>
                    <TextField>{guest.guestTag}</TextField>
                    {isPayer && (
                        <Pressable onPress={() => handleContestPayment(guest.id, true)}>
                            <Image source={CoinX} style={Styles.icon} />
                        </Pressable>
                    )}
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
    icon: {
        width: 32,
        height: 32,
    }
});

export default DidPay;
