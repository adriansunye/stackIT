import { Suspense, lazy } from 'react';
import FullScreenLoader from '@/components/loaders/FullScreenLoader';
import Layout from '@/components/layout/Layout';
import { HomePage, LoginPage, ProfilePage, NotFoundPage} from '@/views';

const Loadable =
    (Component) => (props) =>
    (
        <Suspense fallback={<FullScreenLoader />}>
            <Component {...props} />
        </Suspense>
    );

const RegisterPage = Loadable(lazy(() => import('@/views/register/RegisterPage')));
const UnauthorizedPage = Loadable(
    lazy(() => import('@/views/errors/UnauthorizedPage'))
);

/* A route that is not protected by the `RequireUser` guard. */
const guestRoutes = {
    path: '*',
    element: <Layout />,
    children: [
        {
            index: true,
            element: <HomePage />,
        },
        {
            path: 'login',
            element: <LoginPage />,
        },
        {
            path: 'register',
            element: <RegisterPage />,
        },
        {
            path: '*',
            element: <NotFoundPage />,
        }
    ],
};

/* A route that is protected by the `RequireUser` guard. */
const authRoutes = {
    path: '*',
    element: <Layout />,
    children: [
        {
            path: 'profile',
            element: <ProfilePage />,
        },
        {
            path: 'unauthorized',
            element: <UnauthorizedPage />,
        },
    ],
};

const routes = [guestRoutes, authRoutes];

export default routes;
