import React from 'react';

const initialState = {
    authUser: null,
};

const AuthUserContext = React.createContext((undefined));

const authUserReducer = (state, action) => {
    switch (action.type) {
        case 'SET_AUTH_USER': {
            return {
                ...state,
                authUser: action.payload,
            };
        }
        default: {
            throw new Error(`Unhandled action type`);
        }
    }
};

const AuthUserContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(authUserReducer, initialState);
    const value = { state, dispatch };
    return (
        <AuthUserContext.Provider value={value}>{children}</AuthUserContext.Provider>
    );
};

const useAuthUserContext = () => {
    const context = React.useContext(AuthUserContext);

    if (context) {
        return context;
    }

    throw new Error(`useAuthUserContext must be used within a AuthUserContextProvider`);
};

export { AuthUserContextProvider, useAuthUserContext };
