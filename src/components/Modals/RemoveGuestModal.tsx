import { View, Pressable, Modal, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeGuest } from '../../store/openList/openListThunk';
import TextField from '../Textfield';

import type { AppDispatch } from '../../store/store';
import { ListGuest } from '../../utils/types';

type Props = {
    guest?: ListGuest;
    isModalOpen: boolean;
    closeModal: () => void;
};

const RemoveGuestModal = ({ guest, isModalOpen, closeModal }: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleRemoveGuest = (guest: ListGuest) => {
        dispatch(removeGuest(guest))
        closeModal();
    }

    if (!guest) {
        closeModal();
        return;
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
                        <TextField bold size={18}>Remover convidado</TextField>
                    </View>
                    <TextField align='center'>Tem certeza de que deseja remover <TextField italic bold>{guest.guestName}?</TextField></TextField>
                    <View style={Styles.actions}>
                        <Pressable onPress={closeModal} style={[ Styles.button, Styles.cancel ]}>
                            <TextField color='#C62828'>Cancelar</TextField>
                        </Pressable>
                        <Pressable onPress={() => handleRemoveGuest(guest)} style={[ Styles.button, Styles.remove ]}>
                            <TextField>Remover</TextField>
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
    remove: {
        borderColor: '#030626',
        backgroundColor: '#F2B705'
    }
});

export default RemoveGuestModal;
