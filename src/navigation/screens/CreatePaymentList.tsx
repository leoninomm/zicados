import { useEffect, useState } from 'react';
import { View, Pressable, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import remoteConfig from '@react-native-firebase/remote-config';
import { getOpenListGuests, getOpenListPlayers } from '../../store/openList/openListThunk';
import { setPaymentListPlayers } from '../../store/paymentList/paymentListThunk';
import { useGetPlayers } from '../../hooks/usePlayers';
import { addTime, calculatePricePerSlot, formatCurrency, getPricePerGuest, getPricePerPlayer, subtractTime } from '../../utils/helpers';
import InnerScreenContainer from '../../components/ScreenContainers/InnerScreenContainer';
import TextField from '../../components/Textfield';
import Button from '../../components/Button';
import ListContainer from '../../components/ListStructure/ListContainer';
import ListRow from '../../components/ListStructure/ListRow';
import Avatar from '../../components/Avatar';
import Loading from '../../components/Loading';
import Clock from '../../components/Icons/Clock';

import type { RootState, AppDispatch } from '../../store/store';
import { Drawer, FBConfig, PaymentListGuest, PaymentListPlayer, Screens } from '../../utils/types';

export type PlayersData = Record<string, PaymentListPlayer>;
export type GuestsData = Record<string, PaymentListGuest>;

const CreatePaymentList = () => {
    const [initializing, setInitializing] = useState(true);
    const [playersReady, setPlayersReady] = useState(false);
    const [guestsReady, setGuestsReady] = useState(false);
    const [price, setPrice] = useState('');
    const [playTime, setPlayTime] = useState('');
    const [paymentInfo, setPaymentInfo] = useState('');
    const [playersData, setPlayersData] = useState<PlayersData>({});
    const [guestsData, setGuestsData] = useState<GuestsData>({});
    const [status, setStatus] = useState<'TIME' | 'PRICE'>('TIME');
    const { paymentList } = useSelector((state: RootState) => state.paymentListReducer);
    const { user } = useSelector((state: RootState) => state.authReducer);

    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    const players = useGetPlayers(true);
    const { guests } = useSelector((state: RootState) => state.openListReducer);
    const totalAttending = players.length + guests.length;

    useEffect(() => {
        const dfPrice = remoteConfig().getValue(FBConfig.Price).asString();
        const dfPlayTime = remoteConfig().getValue(FBConfig.PlayTime).asString();

        console.log(dfPlayTime);
        
        setPrice(dfPrice);
        setPlayTime(dfPlayTime);
        
        if (!players.length && paymentList) {
            dispatch(getOpenListPlayers(paymentList.id));
            dispatch(getOpenListGuests(paymentList.id));
        }

        setInitializing(false);
    }, []);
    
    useEffect(() => {
        if (players.length && !playersReady && playTime) {
            let dfPlayersData: PlayersData = {};
            players.map((player) => {
                dfPlayersData[player.uid] = {
                    uid: player.uid,
                    timePlayed: playTime,
                    amountOwed: 0,
                    payed: player.uid === user?.uid,
                };
            });
            setPlayersData(dfPlayersData);
            setPlayersReady(true);
        }
    }, [players, playTime]);

    useEffect(() => {
        if (guests.length && !guestsReady && playTime) {
            let dfGuestsData: GuestsData = {};
            guests.map((guest) => {
                dfGuestsData[guest.id] = {
                    ...guest,
                    timePlayed: playTime,
                    amountOwed: 0,
                    payed: false,
                };
            });
            setGuestsData(dfGuestsData);
            setGuestsReady(true);
        }
    }, [guests, playTime]);

    const handlePrice = (price: string) => {
        const newPrice = formatCurrency(price);
        setPrice(newPrice);
    };

    const handleChangePlayerTime = (id: string, type: 'SUB' | 'ADD') => {
        const player = playersData[id];

        let newTimePlayed= player.timePlayed;
        if (type === 'SUB') newTimePlayed = subtractTime(player.timePlayed);
        else if (type === 'ADD') newTimePlayed = addTime(player.timePlayed, playTime);

        const newPlayersData = {
            ...playersData,
            [id]: {
                ...player,
                timePlayed: newTimePlayed,
            },
        };
        setPlayersData(newPlayersData);
    };

    const handleChangeGuestTime = (id: string, type: 'SUB' | 'ADD') => {
        const guest = guestsData[id];
        
        let newTimePlayed= guest.timePlayed;
        if (type === 'SUB') newTimePlayed = subtractTime(guest.timePlayed);
        else if (type === 'ADD') newTimePlayed = addTime(guest.timePlayed, playTime);

        const newGuestsData = {
            ...guestsData,
            [id]: {
                ...guest,
                timePlayed: newTimePlayed,
            },
        };
        setGuestsData(newGuestsData);
    };

    const handleCalculate = () => {
        const pricePerSlot = calculatePricePerSlot(playersData, guestsData, price);
        const pricedPlayers = getPricePerPlayer(playersData, pricePerSlot);
        const pricedGuests = getPricePerGuest(guestsData, pricePerSlot);

        setPlayersData(pricedPlayers);
        setGuestsData(pricedGuests);
        setStatus('PRICE');
    };

    const handleConfirm = () => {
        dispatch(setPaymentListPlayers(Object.values(playersData), Object.values(guestsData), paymentInfo, price));
        navigation.navigate(Screens.Drawer, { screen: Drawer.PaymentList });
    };

    const handleAction = () => {
        if (status === 'TIME') handleCalculate();
        else if (status === 'PRICE') handleConfirm();
    };

    if (initializing || !playersReady || !guestsReady) return <Loading />

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
                <TextField>{status === 'TIME' ? 'Tempo de jogo' : 'Preço por jogador'}</TextField>
                <View style={{ flex: 1, width: '100%', marginTop: -16 }}>
                    <ListContainer>
                        {players.map((player, i) => (
                            <ListRow index={i} isLast={i === totalAttending - 1} key={player.uid}>
                                <View style={Styles.player}>
                                    <Avatar photo={player.photoURL} size={44} />
                                    <TextField>{player.displayName}</TextField>
                                </View>
                                {status === 'TIME' ? (
                                    <View style={Styles.timeSecction}>
                                        <Pressable onPress={() => handleChangePlayerTime(player.uid, 'SUB')} style={Styles.timeButton}>
                                            <TextField bold size={22}>-</TextField>
                                        </Pressable>
                                        <Clock />
                                        <TextField>{playersData[player.uid].timePlayed}</TextField>
                                        <Pressable onPress={() => handleChangePlayerTime(player.uid, 'ADD')} style={Styles.timeButton}>
                                            <TextField bold size={20}>+</TextField>
                                        </Pressable>
                                    </View>
                                ) : (
                                    <TextField>R$ {playersData[player.uid].amountOwed.toFixed(2).replace('.', ',')}</TextField>
                                )}
                            </ListRow>
                        ))}
                        {guests.map((guest, i) => (
                            <ListRow index={i + 1} isLast={i + players.length === totalAttending} key={guest.guestName}>
                                <TextField>{guest.guestTag}</TextField>
                                {status === 'TIME' ? (
                                    <View style={Styles.timeSecction}>
                                        <Pressable onPress={() => handleChangeGuestTime(guest.id, 'SUB')} style={Styles.timeButton}>
                                            <TextField bold size={22}>-</TextField>
                                        </Pressable>
                                        <Clock />
                                        <TextField>{guestsData[guest.id].timePlayed}</TextField>
                                        <Pressable onPress={() => handleChangeGuestTime(guest.id, 'ADD')} style={Styles.timeButton}>
                                            <TextField bold size={20}>+</TextField>
                                        </Pressable>
                                    </View>
                                ) : (
                                    <TextField>R$ {guestsData[guest.id].amountOwed.toFixed(2).replace('.', ',')}</TextField>
                                )}
                            </ListRow>
                        ))}
                    </ListContainer>
                </View>
                <View style={Styles.actions}>
                    {status === 'PRICE' && <Button variant='OUTLINED' text='Refazer' action={() => setStatus('TIME')} />}
                    <Button
                        variant='FILL'
                        text={status === 'TIME' ? 'Calcular' : 'Confirmar'}
                        action={handleAction}
                        style={{ maxWidth: 150 }}
                    />
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
    player: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
    actions: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 24,
        marginBottom: 24,
    },
    timeSecction: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    timeButton: {
        height: 32,
        width: 32,
        alignItems: 'center',
    },
});

export default CreatePaymentList;
