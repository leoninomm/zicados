import { useState } from 'react';
import { View, Pressable, Modal, StyleSheet, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { addGuest } from '../../store/openList/openListThunk';
import TextField from '../Textfield';

import type { AppDispatch } from '../../store/store';

type Props = {
    isModalOpen: boolean;
    closeModal: () => void;
};

const AddGuestModal = ({ isModalOpen, closeModal }: Props) => {
    const [newGuest, setNewGuest] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleAddGuest = () => {
        dispatch(addGuest(newGuest))
        setNewGuest('');
        closeModal();
    }

    return (
        <Modal
            animationType='slide'
            transparent
            visible={isModalOpen}
            onRequestClose={closeModal}
        >
            <View style={Styles.overlay}>
                <View style={Styles.container}>
                    <View style={{ marginBottom: 32 }}>
                        <TextField bold size={18}>Adicionar convidado</TextField>
                    </View>
                    <View style={{ gap: 4 }}>
                        <TextField>Nome do seu convidado:</TextField>
                        <TextInput
                            value={newGuest}
                            onChangeText={setNewGuest}
                            style={Styles.input}
                        />
                    </View>
                    <View style={Styles.actions}>
                        <Pressable onPress={closeModal} style={[ Styles.button, Styles.cancel ]}>
                            <TextField color='#C62828'>Cancelar</TextField>
                        </Pressable>
                        <Pressable onPress={handleAddGuest} style={[ Styles.button, Styles.add ]}>
                            <TextField>Adicionar</TextField>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const Styles = StyleSheet.create({
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 20,
    },
    container: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 32,
        padding: 20,
    },
    input: {
        width: 300,
        height: 40,
        borderWidth: 2,
        borderColor: '#2F1805',
        borderRadius: 32,
        backgroundColor: 'white',
        padding: 8,
        fontSize: 16,
        fontFamily: 'Inter',
    },
    actions: {
        marginTop: 64,
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
    },
    cancel: {
        borderColor: '#C62828',
        backgroundColor: 'transparent',
    },
    add: {
        borderColor: '#030626',
        backgroundColor: '#F2B705'
    }
});

export default AddGuestModal;
