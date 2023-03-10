import {
    Box,
    CircularProgress,
    Input,
    TextareaAutosize,
    TextField,
    Typography,
} from '@mui/material';
import {
    Controller,
    FormProvider,
    useForm,
} from 'react-hook-form';
import { object, string, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { useEffect } from 'react';
import { pickBy } from 'lodash';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAdvertisementFn } from '@/api/advertisementsApi';
//import FileUploader from '@/components/layout/forms/inputs/FileUploader';
import useHandleError from '@/services/hooks/useHandleError';


const updateAdvertisementSchema = object({
    name: string(),
    category: string().max(70),
    description: string(),
    //image: z.instanceof(File),
}).partial();


const UpdateAdvertisement = ({ setOpenAdvertisementModal, advertisement }) => {
    const queryClient = useQueryClient();
    const { isLoading, mutate: updateAdvertisement } = useMutation(
        ({ id, formData }) =>
            updateAdvertisementFn({ id, formData }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['myAdvertisements']);
                toast.success('Advertisement updated successfully');
                setOpenAdvertisementModal(false);
            },
            onError: (error) => useHandleError(error),
        }
    );

    const methods = useForm({
        resolver: zodResolver(updateAdvertisementSchema),
    });

    const {
        formState: { isSubmitting },
    } = methods;

    useEffect(() => {
        if (isSubmitting) {
            methods.reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitting]);

    useEffect(() => {
        if (advertisement) {
            methods.reset({
                name: advertisement.name,
                category: advertisement.category,
                description: advertisement.description,
                price: advertisement.price
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [advertisement]);

    const onSubmitHandler = (values) => {
        /* const formData = new FormData();
        const filteredFormData = pickBy(
          values,
          (value) => value !== '' && value !== undefined
        );
        const { image, ...otherFormData } = filteredFormData;
        if (image) {
          formData.append('image', image);
        }
        formData.append('data', JSON.stringify(otherFormData)); */
        const formData = values
        const id = advertisement.id;
        updateAdvertisement({ id, formData });
    };

    return (
        <Box>
            <Box display='flex' justifyContent='space-between' sx={{ mb: 3 }}>
                <Typography variant='h5' component='h1'>
                    Edit Advertisement
                </Typography>
                {isLoading && <CircularProgress size='1rem' color='primary' />}
            </Box>
            <FormProvider {...methods}>
                <Box
                    component='form'
                    noValidate
                    autoComplete='off'
                    onSubmit={methods.handleSubmit(onSubmitHandler)}
                >
                    <TextField
                        label='Code'
                        fullWidth
                        sx={{ mb: '1rem' }}
                        {...methods.register('name')}
                    />
                    <TextField
                        label='Title'
                        fullWidth
                        sx={{ mb: '1rem' }}
                        {...methods.register('category')}
                    />
                    <TextField
                        id="outlined-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...methods.register('price')}
                    />
                    <Controller
                        name='description'
                        control={methods.control}
                        defaultValue=''
                        render={({ field }) => (
                            <TextareaAutosize
                                {...field}
                                placeholder='Advertisement Details'
                                minRows={8}
                                style={{
                                    width: '100%',
                                    border: '1px solid #c8d0d4',
                                    fontFamily: 'Roboto, sans-serif',
                                    outline: 'none',
                                    fontSize: '1rem',

                                }}
                            />
                        )}
                    />
                    <LoadingButton
                        variant='contained'
                        fullWidth
                        sx={{ py: '0.8rem', mt: 4, backgroundColor: '#2363eb' }}
                        type='submit'
                        loading={isLoading}
                    >
                        Edit Advertisement
                    </LoadingButton>
                </Box>
            </FormProvider>
        </Box>
    );
};

export default UpdateAdvertisement;
