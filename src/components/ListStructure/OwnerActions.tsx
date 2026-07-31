import { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useModal } from '../../hooks/useModal';
import OwnerActionModal from '../Modals/OwnerActionsModal';
import Edit from '../Icons/Edit';
import Close from '../Icons/Close';
import Dollar from '../Icons/Dollar';

import { Drawer, Screens } from '../../utils/types';

const OwnerActions = () => {
    const [modalVariant, setModalVariant] = useState<'CLOSE' | 'DELETE'>('CLOSE');
    const { isModalOpen, openModal, closeModal } = useModal();
    const navigation = useNavigation();

    const handleDeleteModal = () => {
        setModalVariant('DELETE');
        openModal();
    };

    const handleCloseModal = () => {
        setModalVariant('CLOSE');
        openModal();
    };

    return (
        <View style={Styles.container}>
            <Pressable onPress={() => navigation.navigate(Screens.Drawer, { screen: Drawer.EditOpenList })} style={Styles.button}>
                <Edit />
            </Pressable>
            <Pressable onPress={handleDeleteModal} style={Styles.button}>
                <Close />
            </Pressable>
            <Pressable onPress={handleCloseModal} style={Styles.button}>
                <Dollar />
            </Pressable>
            <OwnerActionModal variant={modalVariant} isModalOpen={isModalOpen} closeModal={closeModal} />
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 24,
        position: 'absolute',
        zIndex: 10,
        top: -16,
        right: 0,
    },
    button: {
        padding: 4,
        borderWidth: 2,
        borderColor: '#2F1805',
        borderRadius: 32,
        backgroundColor: '#F2B705',
    }
});

export default OwnerActions;
