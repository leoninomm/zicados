import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import InnerScreenContainer from '../../components/ScreenContainers/InnerScreenContainer';
import TextField from '../../components/Textfield';
import PaymentStates from '../../components/PaymentStates';

import type { RootState, AppDispatch } from '../../store/store';

const PaymentList = () => {
    const { user } = useSelector((state: RootState) => state.authReducer);
    const { paymentList } = useSelector((state: RootState) => state.paymentListReducer);

    const isUserPayer = user?.uid === paymentList?.payer;

    const getPaymentState = () => {
        if (!paymentList) return <PaymentStates variant='EMPTY' />;
        if (!paymentList.paymentInfo) return <PaymentStates variant='WAITING' hasAction={isUserPayer} />;
        else return null;
    }

    return (
        <InnerScreenContainer>
            {getPaymentState()}
        </InnerScreenContainer>
    );
};

export default PaymentList;
