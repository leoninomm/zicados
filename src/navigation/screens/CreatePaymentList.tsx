import { useEffect, useState } from 'react';
import { View, Pressable, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import remoteConfig from '@react-native-firebase/remote-config';
import { getOpenListGuests, getOpenListPlayers } from '../../store/openList/openListThunk';
import { useGetPlayers, useGetGuests } from '../../hooks/usePlayers';
import { formatCurrency } from '../../utils/helpers';
import InnerScreenContainer from '../../components/ScreenContainers/InnerScreenContainer';
import TextField from '../../components/Textfield';
import ListContainer from '../../components/ListStructure/ListContainer';
import ListRow from '../../components/ListStructure/ListRow';
import Avatar from '../../components/Avatar';
import Loading from '../../components/Loading';

import type { RootState, AppDispatch } from '../../store/store';
import { FBConfig } from '../../utils/types';

const CreatePaymentList = () => {
    const [initializing, setInitializing] = useState(true);
    const [price, setPrice] = useState('');
    const [paymentInfo, setPaymentInfo] = useState('');
    const [status, setStatus] = useState<'TIME' | 'PRICE'>('TIME');
    const { paymentList } = useSelector((state: RootState) => state.paymentListReducer);

    const dispatch = useDispatch<AppDispatch>();
    const players = useGetPlayers(true);
    const { guests } = useSelector((state: RootState) => state.openListReducer);
    const totalAttending = players.length + guests.length;

    console.log(players, guests);

    useEffect(() => {
        const dfPrice = remoteConfig().getValue(FBConfig.Price).asString();
        const dfPlayTime = remoteConfig().getValue(FBConfig.PlayTime).asString();
        console.log(dfPrice, dfPlayTime);

        setPrice(formatCurrency('R$ 220,00'));
        setInitializing(false);
    }, []);

    useEffect(() => {
        if (!players.length && paymentList) {
            dispatch(getOpenListPlayers(paymentList.id));
            dispatch(getOpenListGuests(paymentList.id));
        }
    }, []);

    const handlePrice = (price: string) => {
        const newPrice = formatCurrency(price);
        setPrice(newPrice);
    }

    if (initializing) return <Loading />

    return (
        <InnerScreenContainer>
            <View style={Styles.content}>
                <TextField bold>Encerrar lista para pagamento</TextField>
                <View style={{ gap: 4 }}>
                    <TextField>Valor</TextField>
                    <TextInput
                        value={price}
                        onChangeText={handlePrice}
                        style={Styles.input}
                    />
                </View>
                <View style={{ gap: 4 }}>
                    <TextField>Pix</TextField>
                    <TextInput
                        value={paymentInfo}
                        onChangeText={setPaymentInfo}
                        style={Styles.input}
                    />
                </View>
                <TextField>Tempo de jogo</TextField>
                <View style={{ flex: 1, width: '100%', marginTop: -16 }}>
                    <ListContainer>
                        {players.map((player, i) => (
                            <ListRow index={i} isLast={i === totalAttending - 1} key={player.uid}>
                                <View style={Styles.player}>
                                    <Avatar photo={player.photoURL} size={44} />
                                    <TextField>{player.displayName}</TextField>
                                </View>
                            </ListRow>
                        ))}
                        {guests.map((guest, i) => (
                            <ListRow index={i + 1} isLast={i + players.length === totalAttending} key={guest.guestName}>
                                <TextField>{guest.guestTag}</TextField>
                            </ListRow>
                        ))}
                    </ListContainer>
                </View>
            </View>
        </InnerScreenContainer>
    );
};

const Styles = StyleSheet.create({
    content: {
        width: '100%',
        flex: 1,
        marginTop: 60,
        gap: 16,
        alignItems: 'flex-start',
    },
    input: {
        width: 300,
        height: 40,
        borderWidth: 2,
        borderColor: '#030626',
        borderRadius: 32,
        backgroundColor: 'white',
        padding: 8,
        fontSize: 16,
        fontFamily: 'Inter',
    },
    timeInputField: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 32,
    },
    button: {
        paddingHorizontal: 32,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        borderWidth: 1.5,
        borderColor: '#030626',
        backgroundColor: '#F2B705',
        flexDirection: 'row',
        gap: 12,
        marginTop: 32,
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
    },
    player: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
});

export default CreatePaymentList;
