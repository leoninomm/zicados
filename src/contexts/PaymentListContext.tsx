import React, { createContext, JSX, useState } from 'react';

type PaymentListContextType = {
    currentTab: number;
    setCurrentTab: (tab: number) => void;
};

type PaymentListProviderProps = {
    children: JSX.Element | JSX.Element[];
};

export const PaymentListContext = createContext<PaymentListContextType>({} as PaymentListContextType);

const paymentListContext = (): PaymentListContextType => {
    const [currentTab, setCurrentTab] = useState(0);

    return { currentTab, setCurrentTab };
};

const PaymentListProvider = ({ children }: PaymentListProviderProps) => {
    const { currentTab, setCurrentTab } = paymentListContext();

    return (
        <PaymentListContext.Provider value={{ currentTab, setCurrentTab }}>
            {children}
        </PaymentListContext.Provider>
    );
};

export default PaymentListProvider;
