import { useState, useEffect } from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { openPaymentList } from '../../store/paymentList/paymentListThunk';
import { useGetPlayers } from '../../hooks/usePlayers';
import InnerScreenContainer from '../../components/ScreenContainers/InnerScreenContainer';
import TextField from '../../components/Textfield';
import ListContainer from '../../components/ListStructure/ListContainer';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import Coin from '../../assets/coin.png';

import type { RootState, AppDispatch } from '../../store/store';
import { Drawer, Screens, type Player } from '../../utils/types';

const SelectPayer = () => {
    const [payer, setPayer] = useState<Player>();
    const { user } = useSelector((state: RootState) => state.authReducer);
    const players = useGetPlayers(true);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();

    useEffect(() => {
        const didOwnerAttend = players.find((player) => player.uid === user?.uid);
        if (didOwnerAttend) setPayer(didOwnerAttend);
        else setPayer(players[0]);
    }, []);

    const handleConfirm = () => {
        if (payer) {
            dispatch(openPaymentList(payer.uid));
            if (payer.uid === user?.uid) navigation.navigate(Screens.Drawer, { screen: Drawer.CreatePaymentList });
            else navigation.navigate(Screens.Drawer, { screen: Drawer.PaymentList })
        }
    }
    
    if (!user || !user.photoURL) return null;
    if (!payer) return <Loading />;

    return (
        <InnerScreenContainer>
            <View style={Styles.content}>
                <TextField>Quem pagou a quadra?</TextField>
                <View style={Styles.payerContainer}>
                    <View style={Styles.payerInfo}>
                        <Avatar photo={payer.photoURL} size={44} />
                        <TextField size={18} bold>{payer.displayName}</TextField>
                    </View>
                    <Image source={Coin} style={Styles.icon} />
                </View>
                <View style={{ flex: 6 }}>
                    <ListContainer>
                        {players.map((player, i) => (
                            <Pressable
                                onPress={() => setPayer(player)}
                                key={player.uid}
                                style={[
                                    Styles.row,
                                    (i % 2 === 0) ? Styles.evenRow : Styles.oddRow,
                                    (i === 0) && Styles.firstRow,
                                    (i === players.length - 1) && Styles.lastRow, 
                                ]}
                            >
                                <Avatar photo={player.photoURL} size={44} />
                                <TextField>{player.displayName}</TextField>
                            </Pressable>
                        ))}
                    </ListContainer>
                </View>
                <View style={{ alignItems: 'center', flex: 1 }}>
                    <Button variant='FILL' text='Confirmar' action={handleConfirm} />
                </View>
            </View>
        </InnerScreenContainer>
    );
};

const Styles = StyleSheet.create({
    content: {
        width: '100%',
        marginTop: 30,
        gap: 8,
        flex: 1,
    },
    payerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: '#2F1805',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    icon: {
        height: 44,
        width: 44,
    },
    payerInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        gap: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingVertical: 12,
        paddingHorizontal: 20,

    },
    evenRow: {
        backgroundColor: '#FCF9D9',
    },
    oddRow: {
        backgroundColor: '#FAFBFB',
    },
    firstRow: {
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
    },
    lastRow: {
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    }
})

export default SelectPayer;
