import React, { createContext, JSX, useState } from 'react';

type OpenListContextType = {
    currentTab: number;
    setCurrentTab: (t: number) => void;
};

type OpenListProviderProps = {
    children: JSX.Element | JSX.Element[];
};

export const OpenListContext = createContext<OpenListContextType>({} as OpenListContextType);

const openListContext = (): OpenListContextType => {
    const [currentTab, setCurrentTab] = useState(0);


    return {
        currentTab,
        setCurrentTab,
    };
};
 
const OpenListProvider = ({ children }: OpenListProviderProps) => {
    const {
        currentTab,
        setCurrentTab,
    } = openListContext();

    return (
        <OpenListContext.Provider value={{
            currentTab,
            setCurrentTab,
        }}>
            {children}
        </OpenListContext.Provider>
    );
};

export default OpenListProvider;
