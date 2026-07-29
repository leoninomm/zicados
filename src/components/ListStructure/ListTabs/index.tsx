import { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import TextField from '../../Textfield';
import Present from './Present';
import Absent from './Absent';

const TABS = [
    {
        id: 0,
        name: 'Presentes',
        component: <Present />,
    },
    {
        id: 1,
        name: 'Ausentes',
        component: <Absent />,
    },
    {
        id: 2,
        name: 'Convidados',
        component: null,
    },
];

const ListTabs = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <View style={Styles.container}>
            <View style={Styles.tabsRow}>
                {TABS.map((tab) => (
                    <Pressable key={tab.id} onPress={() => setSelectedTab(tab.id)} style={TabStyles(selectedTab === tab.id).tab}>
                        <TextField>{tab.name}</TextField>
                    </Pressable>
                ))}
            </View>
            <View>
                {TABS[selectedTab].component}
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 20,
    },
    tabsRow: {
        flexDirection: 'row',
        gap: 12,
    },
});

const TabStyles = (isSelected: boolean) => StyleSheet.create({
    tab: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: isSelected ? '#3E9618' : '#2F1805',
        borderRadius: 32,
        backgroundColor: isSelected ? '#AFD918' : '#FCF9D9'
    }
})

export default ListTabs;
