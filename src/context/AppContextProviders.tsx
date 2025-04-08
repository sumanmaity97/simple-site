import { ReactNode } from 'react';
import { AppProvider } from './AppContext';
import { UserProvider } from './UserContext';
import { composeProviders } from './ComposeProviders';

const providers = [AppProvider, UserProvider];

const AppContextProvider = ({ children }: { children: ReactNode }) => {
    return composeProviders(providers, children);
};

export default AppContextProvider;