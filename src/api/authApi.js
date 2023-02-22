import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_ENDPOINT;

export const authApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const refreshAccessTokenFn = async () => {
    const response = await authApi.get('/api/refresh');
    return response.data;
};

authApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const errMessage = error.response.data.message;
        if (errMessage.includes('not logged in') && !originalRequest._retry) {
            originalRequest._retry = true;
            await refreshAccessTokenFn();
            return authApi(originalRequest);
        }
        if (error.response.data.message.includes('not refresh')) {
            document.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const signUpUserFn = async (user) => {
    const response = await authApi.post('/api/register', user);
    return response.data;
};

export const loginUserFn = async (user) => {
    const response = await authApi.post('/api/login', user);
    return response.data;
};

export const verifyEmailFn = async (verificationCode) => {
    const response = await authApi.get(
        `/api/verifyemail/${verificationCode}`
    );
    return response.data;
};

export const logoutUserFn = async () => {
    const response = await authApi.post('/api/logout');
    return response.data;
};

export const getMeFn = async () => {
    const response = await authApi.get('/api/users/me');
    return response.data;
};