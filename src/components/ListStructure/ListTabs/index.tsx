import { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useModal } from '../../../hooks/useModal';
import TextField from '../../Textfield';
import ListPlayers from './ListPlayers';
import Guests from './Guests';
import AddGuestModal from '../../Modals/AddGuestModal';

const TABS = [
    {
        id: 0,
        name: 'Presentes',
        component: <ListPlayers attending />,
    },
    {
        id: 1,
        name: 'Ausentes',
        component: <ListPlayers />,
    },
    {
        id: 2,
        name: 'Convidados',
        component: <Guests />,
    },
];

const ListTabs = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <View style={Styles.container}>
            <View style={Styles.tabsRow}>
                {TABS.map((tab) => (
                    <Pressable key={tab.id} onPress={() => setSelectedTab(tab.id)} style={TabStyles(selectedTab === tab.id).tab}>
                        <TextField>{tab.name}</TextField>
                    </Pressable>
                ))}
            </View>
            <View style={{ flex: 1 }}>
                {TABS[selectedTab].component}
            </View>
            {selectedTab === 2 && (
                <View style={{ alignItems: 'center' }}>
                    <Pressable style={Styles.button} onPress={openModal}>
                        <TextField>Adicionar convidado</TextField>
                    </Pressable>
                </View>
            )}
            <AddGuestModal isModalOpen={isModalOpen} closeModal={closeModal} />
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 20,
        flex: 1,
    },
    tabsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        marginBottom: 30,
        paddingHorizontal: 32,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        borderWidth: 1.5,
        borderColor: '#030626',
        backgroundColor: '#F2B705'
    },
});

const TabStyles = (isSelected: boolean) => StyleSheet.create({
    tab: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: isSelected ? '#3E9618' : '#2F1805',
        borderRadius: 32,
        backgroundColor: isSelected ? '#AFD918' : '#FCF9D9'
    }
})

export default ListTabs;
