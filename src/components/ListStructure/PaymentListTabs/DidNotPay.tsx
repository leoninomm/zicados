import { useContext, useEffect } from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updatePlayerPaymentStatus, updateGuestPaymentStatus } from '../../../store/paymentList/paymentListThunk';
import { useGetPaymentPlayers, useGetPaymentGuests, useIsPayer } from '../../../hooks/usePlayers';
import { PaymentListContext } from '../../../contexts/PaymentListContext';
import ListContainer from '../ListContainer';
import ListRow from '../ListRow';
import TextField from '../../Textfield';
import Button from '../../Button';
import Avatar from '../../Avatar';
import Coin from '../../../assets/coin.png';
import CoinCheck from '../../../assets/coin-check-mark.png';

import type { RootState, AppDispatch } from '../../../store/store';

const DidNotPay = () => {
    const { user } = useSelector((state: RootState) => state.authReducer);
    const { setCurrentTab, isPaymentDone, setIsPaymentDone } = useContext(PaymentListContext);
    const players = useGetPaymentPlayers(false);
    const guests = useGetPaymentGuests(false);
    const isPayer = useIsPayer();

    const dispatch = useDispatch<AppDispatch>();

    const handlePay = (player: string, isGuest: boolean) => {
        if (isGuest) dispatch(updateGuestPaymentStatus(player, true));
        else dispatch(updatePlayerPaymentStatus(player, true));

        if (players.length + guests.length === 1) setIsPaymentDone(true);

        setCurrentTab(1);
    };

    useEffect(() => {
        if ((players.length || guests.length) && isPaymentDone) setIsPaymentDone(false);
        else setIsPaymentDone(true);
    }, [players, guests]);

    if (!user) return null;

    if (!players.length && !guests.length) return (
        <View style={{ marginTop: 32, width: '100%', justifyContent: 'center', alignItems: 'center', gap: 24, flex: 2 }}>
            <Image source={CoinCheck} style={{ height: 150, width: 150 }} />
            <TextField bold size={22}>Todos pagaram!</TextField>
        </View>
    )

    return (
        <ListContainer>
            {players.map((player, i) => (
                <ListRow index={i} isLast={false} key={player.uid}>
                    <View style={Styles.player}>
                        <Avatar photo={player.photoURL} size={44} />
                        <TextField>{player.displayName}</TextField>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                        <TextField>{`R$ ${player.amountOwed.toFixed(2)}`}</TextField>
                        {(isPayer || player.uid === user.uid) && (
                            <Pressable onPress={() => handlePay(player.uid, false)}>
                                <Image source={Coin} style={Styles.icon} />
                            </Pressable>
                        )}
                    </View>
                </ListRow>
            ))}
            {guests.map((guest, i) => (
                <ListRow index={i} isLast={false} key={guest.id}>
                    <TextField>{guest.guestTag}</TextField>
                    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                        <TextField>{`R$ ${guest.amountOwed.toFixed(2)}`}</TextField>
                        {(isPayer || guest.playerResponsible === user.uid) && (
                            <Pressable onPress={() => handlePay(guest.id, true)}>
                                <Image source={Coin} style={Styles.icon} />
                            </Pressable>
                        )}
                    </View>
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
        height: 32,
        width: 32,
    }
});

export default DidNotPay;
