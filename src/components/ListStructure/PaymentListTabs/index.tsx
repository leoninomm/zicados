import { useContext } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { closePaymentList } from '../../../store/paymentList/paymentListThunk';
import { PaymentListContext } from '../../../contexts/PaymentListContext';
import TextField from '../../Textfield';
import Button from '../../Button';
import DidPay from './DidPay';
import DidNotPay from './DidNotPay';

import type { AppDispatch } from '../../../store/store';
import { Screens, Drawer } from '../../../utils/types';

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
    const { currentTab, setCurrentTab, isPaymentDone } = useContext(PaymentListContext);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();

    const handleCloseList = () => {
        dispatch(closePaymentList());
        navigation.navigate(Screens.Drawer, { screen: Drawer.Home });
    };

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
                <View style={{ width: '100%', alignItems: 'center', flex: 1, marginTop: 16 }}>
                    <Button text='Fechar lista' action={handleCloseList} variant='FILL' disabled={!isPaymentDone} />
                </View>
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
