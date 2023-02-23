import React from 'react';

const initialState = {
    advertisement: null,
};

const AdvertisementContext = React.createContext((undefined));

const advertisementReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ADVERTISEMENT': {
            return {
                ...state,
                advertisement: action.payload,
            };
        }
        default: {
            throw new Error(`Unhandled action type`);
        }
    }
};

const AdvertisementContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(advertisementReducer, initialState);
    const value = { state, dispatch };
    return (
        <AdvertisementContext.Provider value={value}>{children}</AdvertisementContext.Provider>
    );
};

const useAdvertisementContext = () => {
    const context = React.useContext(AdvertisementContext);

    if (context) {
        return context;
    }

    throw new Error(`useAdvertisementContext must be used within a AdvertisementContextProvider`);
};

export { AdvertisementContextProvider, useAdvertisementContext };
