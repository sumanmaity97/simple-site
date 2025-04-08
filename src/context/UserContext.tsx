import React, { createContext, useContext, useState } from 'react';
import { IUser, IUserContext } from '../../types';

// Create context
const UserContext = createContext<IUserContext | undefined>(undefined);

// Create provider
export const UserProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<IUser | null>(null); // You can initialize with user data if available

    const updateUser = (userData: IUser) => setUser(userData);
    const clearUser = () => setUser(null);

    return (
        <UserContext.Provider value={{ user, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for easier access
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};