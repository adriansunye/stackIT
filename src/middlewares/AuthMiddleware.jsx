import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import { getMeFn } from '@/api/authApi';
import { useAuthUserContext } from '@/services/providers/AuthUserContextProvider';
import FullScreenLoader from '@/components/loaders/FullScreenLoader';
import React from 'react';

const AuthMiddleware = ({ children }) => {
    const [cookies] = useCookies(['logged_in']);
    const authUserContext = useAuthUserContext();

    const query = useQuery(['authUser'], () => getMeFn(), {
        select: (data) => data.user,
        onSuccess: (data) => {
            authUserContext.dispatch({ type: 'SET_AUTH_USER', payload: data });
        },
    });

    if (query.isLoading && cookies.logged_in) {
        return <FullScreenLoader />;
    }

    return children;
};

export default AuthMiddleware;
