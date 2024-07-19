import React, { createContext, useContext, useState } from 'react';

const SharedStateContext = createContext();

export const useSharedState = () => {
    return useContext(SharedStateContext);
};

export const SharedStateProvider = ({ children }) => {
    const [state, setState] = useState({
        // Initial shared state
        data: null,
    });

    const value = { state, setState };

    return (
        <SharedStateContext.Provider value={value}>
            {children}
        </SharedStateContext.Provider>
    );
};