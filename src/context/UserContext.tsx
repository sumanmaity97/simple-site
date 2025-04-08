import { createContext, useContext, useState } from 'react';
import { IUser, IUserContext } from '../../types';
import { API } from '../utils/api';

// Create context
const UserContext = createContext<IUserContext | undefined>(undefined);

// Create provider
export const UserProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<IUser | null>(null); // You can initialize with user data if available

    const updateUser = (userData: IUser) => setUser(userData);
    const clearUser = () => setUser(null);
    const fetchUser = async (id: string) => {
        try {
            const response: any = await API.get(`auth/profile/${id}`);
            console.log("PPPP: ", response);
            let tempUser: IUser = { ...user } as IUser;
            tempUser.profileData = response.profileData;
            setUser(tempUser);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, updateUser, clearUser, fetchUser }}>
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