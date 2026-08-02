import { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import { updateListInfo } from '../../store/openList/openListThunk';
import { useTheme } from '../../hooks/useTheme';
import InnerScreenContainer from '../../components/ScreenContainers/InnerScreenContainer';
import TextField from '../../components/Textfield';
import Loading from '../../components/Loading';

import type { AppDispatch, RootState } from '../../store/store';
import type { Theme } from '../../utils/theme';

const EditOpenList = () => {
    const [initializing, setInitializing] = useState(true);
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [minPlayers, setMinPlayers] = useState(0);
    const [maxPlayers, setMaxPlayers] = useState(0);
    const [date, setDate] = useState('');

    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [openStartTimePicker, setOpenStartTimePicker] = useState(false);
    const [openEndTimePicker, setOpenEndTimePicker] = useState(false);

    const { loading, list } = useSelector((state: RootState) => state.openListReducer);
    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();

    useEffect(() => {
        if (list) {
            setTitle(list.title);
            setStartTime(list.startTime);
            setEndTime(list.endTime);
            setLocation(list.location);
            setMinPlayers(list.minPlayers);
            setMaxPlayers(list.maxPlayers);
            setDate(list.date);
            setInitializing(false);
        }
    }, [list]);

    const handleDatePicker = (date: Date) => {
        setDate(date.toLocaleDateString('pt-br'));
        setOpenDatePicker(false);
    };

    const handleTimePicker = (date: any, start: boolean) => {
        const timeStr = date.toLocaleTimeString('pt-br').split(':');
        const time = timeStr[0] + ':' + timeStr[1];
        if (start) {
            setStartTime(time);
            setOpenStartTimePicker(false);
        } else {
            setEndTime(time);
            setOpenEndTimePicker(false);
        }
    };

    const handleUpdateList = async() => {
        const newList = {
            title,
            startTime,
            endTime,
            date,
            location,
            minPlayers,
            maxPlayers,
        };

        const success = await dispatch(updateListInfo(newList));
        if (success) navigation.goBack();
    }

    const styles = Styles(theme);

    return (
        <InnerScreenContainer>
            <ScrollView>
                <View style={styles.content}>
                    <TextField>Atualização da lista <TextField bold italic>{title}</TextField></TextField>
                    <View style={{ gap: 4, marginTop: 16 }}>
                        <TextField>Título</TextField>
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            style={styles.input}
                        />
                    </View>

                    <View style={{ gap: 4}}>
                        <TextField>Data</TextField>
                        <Pressable style={styles.input} onPress={() => setOpenDatePicker(true)}>
                            <TextField>{date}</TextField>
                        </Pressable>
                        <DatePicker
                            modal
                            open={openDatePicker}
                            date={new Date()}
                            mode='date'
                            locale='pt-br'
                            onConfirm={(date) => handleDatePicker(date)}
                            onCancel={() => setOpenDatePicker(false)}
                        />
                    </View>

                    <View style={{ gap: 4 }}>
                        <TextField>Horário</TextField>
                        <View style={styles.timeInputField}>
                            <Pressable style={{ ...styles.input, width: 100 }} onPress={() => setOpenStartTimePicker(true)}>
                                <TextField>{startTime}</TextField>
                            </Pressable>
                            <DatePicker
                                modal
                                open={openStartTimePicker}
                                date={new Date()}
                                mode='time'
                                locale='pt-br'
                                onConfirm={(date) => handleTimePicker(date, true)}
                                onCancel={() => setOpenStartTimePicker(false)}
                            />
                            <TextField>às</TextField>
                            <Pressable style={{ ...styles.input, width: 100 }} onPress={() => setOpenEndTimePicker(true)}>
                                <TextField>{endTime}</TextField>
                            </Pressable>
                            <DatePicker
                                modal
                                open={openEndTimePicker}
                                date={new Date()}
                                mode='time'
                                locale='pt-br'
                                onConfirm={(date) => handleTimePicker(date, false)}
                                onCancel={() => setOpenEndTimePicker(false)}
                            />
                        </View>
                    </View>

                    <View style={{ gap: 4 }}>
                        <TextField>Local</TextField>
                        <TextInput
                            value={location}
                            onChangeText={setLocation}
                            style={styles.input}
                        />
                    </View>

                    <View style={{ gap: 4 }}>
                        <TextField>Mínimo de jogadores</TextField>
                        <TextInput
                            value={minPlayers.toString()}
                            onChangeText={(t: string) => setMinPlayers(Math.floor(Number(t)))}
                            keyboardType='numeric'
                            style={{ ...styles.input, width: 100 }}
                        />
                    </View>

                    <View style={{ gap: 4 }}>
                        <TextField>Máximo de jogadores</TextField>
                        <TextInput
                            value={maxPlayers.toString()}
                            onChangeText={(t: string) => setMaxPlayers(Math.floor(Number(t)))}
                            keyboardType='numeric'
                            style={{ ...styles.input, width: 100 }}
                        />
                    </View>

                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Pressable style={styles.button} onPress={handleUpdateList}>
                            <TextField>Atualizar</TextField>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            {(initializing || loading) && <Loading />}
        </InnerScreenContainer>
    );
};

const Styles = (theme: Theme) => StyleSheet.create({
    content: {
        width: '100%',
        marginTop: 80,
        gap: 16,
        alignItems: 'flex-start',
    },
    input: {
        width: 300,
        height: 40,
        borderWidth: 2,
        borderColor: theme.border,
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
        borderColor: theme.border,
        backgroundColor: theme.button,
        flexDirection: 'row',
        gap: 12,
        marginTop: 32,
    },
});

export default EditOpenList;
