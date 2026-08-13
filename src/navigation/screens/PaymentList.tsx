import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getPaymentListGuests, getPaymentListPlayers } from '../../store/paymentList/paymentListThunk';
import PaymentListProvider from '../../contexts/PaymentListContext';
import InnerScreenContainer from '../../components/ScreenContainers/InnerScreenContainer';
import TextField from '../../components/Textfield';
import PaymentStates from '../../components/PaymentStates';
import PaymentListTabs from '../../components/ListStructure/PaymentListTabs';
import Loading from '../../components/Loading';

import type { RootState, AppDispatch } from '../../store/store';

const PaymentList = () => {
    const [initializing, setInitializing] = useState(true);
    const { user } = useSelector((state: RootState) => state.authReducer);
    const { paymentList, players, guestsFetched } = useSelector((state: RootState) => state.paymentListReducer);

    const dispatch = useDispatch<AppDispatch>();
    const isUserPayer = user?.uid === paymentList?.payer;

    useEffect(() => {
        if (!players.length) dispatch(getPaymentListPlayers())

        if (!guestsFetched) dispatch(getPaymentListGuests());
        
        setTimeout(() => setInitializing(false), 2000);
    }, [players, guestsFetched]);

    const getPaymentState = () => {
        if (!paymentList) return <PaymentStates variant='EMPTY' />;
        if (!paymentList.paymentInfo) return <PaymentStates variant='WAITING' hasAction={isUserPayer} />;
        else return <PaymentListTabs />;
    }

    if (initializing) return <Loading />

    return (
        <PaymentListProvider>
            <InnerScreenContainer>
                {getPaymentState()}
            </InnerScreenContainer>
        </PaymentListProvider>
    );
};

export default PaymentList;
