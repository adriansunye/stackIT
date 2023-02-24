import {
    Box,
    CircularProgress,
    FormHelperText,
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
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAdvertisementFn } from '@/api/advertisementsApi';

const createAdvertisementSchema = object({
    name: string().min(1, 'Title is required'),
    category: string().max(50).min(1, 'Category is required'),
    description: string().max(50).min(1, 'Description is required'),
});

const CreateAdvertisementModal = ({ setOpenAdvertisementModal }) => {
    const queryClient = useQueryClient();
    const { isLoading, mutate: createAdvertisement } = useMutation(
        (advertisement) => createAdvertisementFn(advertisement),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['myAdvertisements']);
                toast.success('Advertisement created successfully');
                setOpenAdvertisementModal(false);
            },
            onError: (error) => {
                setOpenAdvertisementModal(false);
                if (Array.isArray(error.response.data.error)) {
                    error.data.error.forEach((el) =>
                        toast.error(el.message, {
                            position: 'top-right',
                        })
                    );
                } else {
                    toast.error(error.response.data.message, {
                        position: 'top-right',
                    });
                }
            },
        }
    );

    const methods = useForm({
        resolver: zodResolver(createAdvertisementSchema),
    });

    const {
        formState: { errors, isSubmitSuccessful },
    } = methods;

    useEffect(() => {
        if (isSubmitSuccessful) {
            methods.reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler = (values) => {
        createAdvertisement(values);
    };

    return (
        <Box>
            <Box display='flex' justifyContent='space-between' sx={{ mb: 3 }}>
                <Typography variant='h5' component='h1'>
                    Create Advertisement
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
                        label='Advertisement Title'
                        fullWidth
                        sx={{ mb: '1rem' }}
                        {...methods.register('name')}
                    />
                    <FormHelperText error={!!errors['name']}>
                        {errors['name'] ? errors['name'].message : ''}
                    </FormHelperText>
                    <TextField
                        label='Category'
                        fullWidth
                        sx={{ mb: '1rem' }}
                        {...methods.register('category')}
                    />
                    <FormHelperText error={!!errors['category']}>
                        {errors['category'] ? errors['category'].message : ''}
                    </FormHelperText>

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
                            <>
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
                                        padding: '1rem',
                                    }}
                                />
                                <FormHelperText error={!!errors[field.name]}>
                                    {errors[field.name] ? errors[field.name]?.message : ''}
                                </FormHelperText>
                            </>
                        )}
                    />
                    <LoadingButton
                        variant='contained'
                        fullWidth
                        sx={{ py: '0.8rem', mt: 4, backgroundColor: '#2363eb' }}
                        type='submit'
                        loading={isLoading}
                    >
                        Create Advertisement
                    </LoadingButton>
                </Box>
            </FormProvider>
        </Box>
    );
};

export default CreateAdvertisementModal;
