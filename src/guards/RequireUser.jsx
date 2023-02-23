import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getMeFn } from '@/api/authApi';
import { useAuthUserContext } from '@/services/providers/AuthUserContextProvider';
import FullScreenLoader from '@/components/loaders/FullScreenLoader';

const RequireUser = ({ allowedRoles }) => {
    const [cookies] = useCookies(['logged_in']);
    const location = useLocation();
    const authUserContext = useAuthUserContext();

    const {
        isLoading,
        isFetching,
        data: user,
    } = useQuery(['authUser'], getMeFn, {
        retry: 1,
        select: (data) => data.user,
        onSuccess: (data) => {
            authUserContext.dispatch({ type: 'SET_AUTH_USER', payload: data });
        },
    });

    const loading = isLoading || isFetching;

    if (loading) {
        return <FullScreenLoader />;
    }

    return (cookies.logged_in || user) &&
        allowedRoles.includes(user?.role[0]) ? (
        <Outlet />
    ) /* : cookies.logged_in && user ? (
        <Navigate to='/unauthorized' state={{ from: location }} replace /> 
    )*/ : (
        <Navigate to='/login' state={{ from: location }} replace />
    );
};

export default RequireUser;
