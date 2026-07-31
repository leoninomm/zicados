import { useContext } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { OpenListContext } from '../../../contexts/OpenListContext';
import { useStats } from '../../../hooks/usePlayers';
import { useModal } from '../../../hooks/useModal';
import TextField from '../../Textfield';
import ListPlayers from './ListPlayers';
import Guests from './Guests';
import AddGuestModal from '../../Modals/AddGuestModal';
import Player from '../../Icons/Player';
import Clipboard from '../../Icons/Clipboard';
import SittingChair from '../../Icons/SittingChair';

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
    const { currentTab, setCurrentTab } = useContext(OpenListContext);
    const { totalAbsent, totalAttending, totalReplies } = useStats();
    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <View style={Styles.container}>
            <View style={Styles.tabsRow}>
                {TABS.map((tab) => (
                    <Pressable key={tab.id} onPress={() => setCurrentTab(tab.id)} style={TabStyles(currentTab === tab.id).tab}>
                        <TextField>{tab.name}</TextField>
                    </Pressable>
                ))}
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 6 }}>
                    {TABS[currentTab].component}
                </View>
                {(totalAbsent || totalAttending || totalReplies) &&(
                    <View style={{...Styles.stats, flex: 1, marginBottom: 8 }}>
                        <View style={Styles.statItem}>
                            <Clipboard />
                            <TextField bold>{totalReplies}</TextField>
                        </View>
                        <View style={Styles.statItem}>
                            <Player />
                            <TextField bold>{totalAttending}</TextField>
                        </View>
                        <View style={Styles.statItem}>
                            <SittingChair />
                            <TextField bold>{totalAbsent}</TextField>
                        </View>
                    </View>
                )}
            </View>
            {currentTab === 2 && (
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
    stats: {
        flexDirection: 'row',
        gap: 24,
        marginTop: 16,
    },
    statItem: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    }
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
