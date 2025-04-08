import React, { ReactNode, ReactElement } from 'react';

export const composeProviders = (
    providers: Array<React.ComponentType<{ children: ReactNode }>>,
    children: ReactNode
): ReactElement => {
    return providers.reduceRight((acc, Provider) => {        
        return <Provider>{acc}</Provider>;
    }, children as ReactElement);
};