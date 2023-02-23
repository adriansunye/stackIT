import React from 'react';

const languageEn = {
    home: {
        title: 'Find the perfect freelance services for your business in Stack-IT',
        description: 'Browse through thousands of profiles and find the perfect match for your bussiness',
        join: '12,000+ people already joined. Get started today!'
    },
    bussiness: {
        title: 'Trusted By Over 100+ Startups'
    },
    features: {
        title: 'Get a lot of offers'
    },
    header:{
        services: 'Services',
        profile: 'Profile'
    }
}

const languageEs = {
    home: {
        title: 'Encuentra los freelance perfectos para tu negocio en Stack-IT',
        description: 'Busca entre miles de perfiles y encuentra el candidato perfecto para tu empresa',
        join: 'Más de 12,000 personas ya se han unido. Empieza hoy!'
    },
    bussiness: {
        title: 'Más de 100 Startups han depositado su confianza en nosotros'
    },
    features: {
        title: 'Consigue muchas ofertas de trabajo'
    },
    header:{
        services: 'Servicios',
        profile: 'Perfil'
    }
}

const initialState = {
    languageMode: 'Es',
    texts: languageEs,
};


const LanguageModeContext = React.createContext((undefined));

const languageModeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LANGUAGE_MODE': {
            return {
                ...state,
                languageMode: action.payload,
                texts: action.payload === 'Es' ? languageEs : languageEn,
            };
        }
        default: {
            throw new Error(`Unhandled action type`);
        }
    }
};

const LanguageModeContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(languageModeReducer, initialState);
    const value = { state, dispatch };
    return (
        <LanguageModeContext.Provider value={value}>{children}</LanguageModeContext.Provider>
    );
};

const useLanguageModeContext = () => {
    const context = React.useContext(LanguageModeContext);

    if (context) {
        return context;
    }

    throw new Error(`useLanguageModeContext must be used within a LanguageModeContextProvider`);
};

export { LanguageModeContextProvider, useLanguageModeContext };
