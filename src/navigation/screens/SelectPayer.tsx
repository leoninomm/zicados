import { useState, useEffect } from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
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
import type { Player } from '../../utils/types';

const SelectPayer = () => {
    const [payer, setPayer] = useState<Player>();
    const { user } = useSelector((state: RootState) => state.authReducer);
    const players = useGetPlayers(true);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const didOwnerAttend = players.find((player) => player.uid === user?.uid);
        if (didOwnerAttend) setPayer(didOwnerAttend);
        else setPayer(players[0]);
    }, []);
    
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
                <View style={{ alignItems: 'center', marginTop: 16 }}>
                    <Button variant='FILL' text='Confirmar' action={() => dispatch(openPaymentList(payer.uid))} />
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
        marginBottom: 32,
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
