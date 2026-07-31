import { View, Pressable, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { replyToList } from '../store/openList/openListThunk';
import TextField from './Textfield';
import Notification from './Icons/Notification';
import CheckCircle from './Icons/CheckCircle';
import CancelCircle from './Icons/CancelCircle';

import type { AppDispatch } from '../store/store';

const ReplyToList = () => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <View style={Styles.container}>
            <View style={Styles.title}>
                <Notification />
                <TextField bold>Confirmar presença</TextField>
            </View>
            <View style={Styles.actions}>
                <Pressable style={[Styles.button, Styles.greenButton]} onPress={() => dispatch(replyToList(true))}>
                    <CheckCircle />
                    <TextField color='#2E7D32'>Jogar</TextField>
                </Pressable>
                <Pressable style={[Styles.button, Styles.redButton]} onPress={() => dispatch(replyToList(false))}>
                    <CancelCircle />
                    <TextField color='#C62828'>Faltar</TextField>
                </Pressable>
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        marginTop: 30,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#8B6B00',
        borderRadius: 32,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#E2B007',
        width: '100%',
    },
    title: {
        flexDirection: 'row',
        gap: 4,
        width: '100%',
        justifyContent: 'flex-start'
    },
    actions: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        flexDirection: 'row',
        gap: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 32,
        backgroundColor: 'transparent'
    },
    greenButton: {
        borderColor: '#2E7D32',
    },
    redButton: {
        borderColor: '#C62828',
    },
});

export default ReplyToList;
