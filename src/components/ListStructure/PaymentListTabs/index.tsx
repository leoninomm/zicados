import { useContext } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { PaymentListContext } from '../../../contexts/PaymentListContext';
import TextField from '../../Textfield';
import DidPay from './DidPay';
import DidNotPay from './DidNotPay';

const TABS = [
    {
        id: 0,
        name: 'Caloteiros',
        component: <DidNotPay />,
    },
    {
        id: 1,
        name: 'Pessoas de bem',
        component: <DidPay />,
    },
];

const PaymentListTabs = () => {
    const { currentTab, setCurrentTab } = useContext(PaymentListContext);

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
                {TABS[currentTab].component}
            </View>
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
});

export default PaymentListTabs;
