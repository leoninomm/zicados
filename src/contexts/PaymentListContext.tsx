import React, { createContext, JSX, useState } from 'react';

type PaymentListContextType = {
    currentTab: number;
    isPaymentDone: boolean;
    setCurrentTab: (tab: number) => void;
    setIsPaymentDone: (b: boolean) => void;
};

type PaymentListProviderProps = {
    children: JSX.Element | JSX.Element[];
};

export const PaymentListContext = createContext<PaymentListContextType>({} as PaymentListContextType);

const paymentListContext = (): PaymentListContextType => {
    const [currentTab, setCurrentTab] = useState(0);
    const [isPaymentDone, setIsPaymentDone] = useState(false);

    return { currentTab, setCurrentTab, isPaymentDone, setIsPaymentDone };
};

const PaymentListProvider = ({ children }: PaymentListProviderProps) => {
    const { currentTab, setCurrentTab, isPaymentDone, setIsPaymentDone } = paymentListContext();

    return (
        <PaymentListContext.Provider value={{ currentTab, setCurrentTab, isPaymentDone, setIsPaymentDone }}>
            {children}
        </PaymentListContext.Provider>
    );
};

export default PaymentListProvider;
