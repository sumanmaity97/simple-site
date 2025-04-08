import { createContext, useContext, useState } from 'react';
import { IAppContext } from '../../types';

// Create context
const AppContext = createContext<IAppContext | undefined>(undefined);

// Create provider
export const AppProvider = ({ children }: { children: any }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // You can initialize with user data if available

    const updateLoggedIn = (status: boolean) => setIsLoggedIn(status);

    return (
        <AppContext.Provider value={{ isLoggedIn, updateLoggedIn }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook for easier access
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within a AppProvider');
    }
    return context;
};