import { View, Pressable, Modal, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateListInfo } from '../../store/openList/openListThunk';
import TextField from '../Textfield';

import type { AppDispatch } from '../../store/store';

type Props = {
    variant: 'CLOSE' | 'DELETE' | 'NOT_ENOUGH_PLAYERS';
    isModalOpen: boolean;
    closeModal: () => void;
};

const VARIANTS = {
    'CLOSE': {
        title: 'Pagar',
        text: 'O vôlei rolou, alguém pagou, e ta na hora de cobrar a galera.',
        buttonText: 'Fechar',
    },
    'DELETE': {
        title: 'Fechar lista',
        text: 'Essa lista vai ser DELETADA (não é a mesma coisa de fechar pra pagamento). Tem certeza?',
        buttonText: 'Deletar',
    },
    'NOT_ENOUGH_PLAYERS': {
        title: 'OPA',
        text: 'A quantidade de jogadores é menor que a quantidade mínima. Para passar a lista pra pagamento, peça aos jogadores que confirmem quem compareceu.',
        buttonText: 'Notificar',
    }
};

const OwnerActionModal = ({ variant, isModalOpen, closeModal }: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleOwnerAction = () => {
        if (variant === 'DELETE') dispatch(updateListInfo({ isClosed: true }));
        closeModal();
    };

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
                        <TextField bold size={18}>{VARIANTS[variant].title}</TextField>
                    </View>
                    <TextField align='center'>{VARIANTS[variant].text}</TextField>
                    <View style={Styles.actions}>
                        <Pressable onPress={closeModal} style={[ Styles.button, Styles.cancel ]}>
                            <TextField color='#C62828'>Cancelar</TextField>
                        </Pressable>
                        <Pressable onPress={handleOwnerAction} style={[ Styles.button, Styles.remove ]}>
                            <TextField>{VARIANTS[variant].buttonText}</TextField>
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

export default OwnerActionModal;
