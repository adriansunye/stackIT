import { authApi } from './authApi';

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const getAllAdvertisementsFn = async () => {
    const response = await authApi.get(`api/advertisements`);
    console.log(response)
    return response.data;
};

export const getAdvertisementFn = async (id) => {
    const response = await authApi.get(`api/advertisements/${id}`);
    return response.data;
};

export const createAdvertisementFn = async (formData) => {
    const response = await authApi.post(`api/advertisements`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateAdvertisementFn = async ({
    id,
    formData,
}) => {
    const response = await authApi.patch(`api/advertisements/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteAdvertisementFn = async (id) => {
    const response = await authApi.delete(`api/advertisements/${id}`);
    return response.data;
};
