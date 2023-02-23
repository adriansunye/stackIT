import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/layout/forms/FormInput';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMeFn, loginUserFn } from '@/api/authApi';
import { useAuthUserContext } from '@/services/providers/AuthUserContextProvider';
import useHandleError from '@/services/hooks/useHandleError';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: #f9d13e;
  color: #2363eb;
  font-weight: 500;

  &:hover {
    background-color: #ebc22c;
    transform: translateY(-2px);
  }
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #2363eb;
  &:hover {
    text-decoration: underline;
  }
`;

const loginSchema = object({
    email: string()
        .min(1, 'Email address is required')
        .email('Email Address is invalid'),
    password: string()
        .min(1, 'Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
});


const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = ((location.state)?.from.pathname) || '/';

    const methods = useForm({
        resolver: zodResolver(loginSchema),
    });

    const authUserContext = useAuthUserContext();

    // API Get Current Logged-in user
    const query = useQuery(['authUser'], getMeFn, {
        enabled: false,
        select: (data) => data.user,
        retry: 1,
        onSuccess: (data) => {
            authUserContext.dispatch({ type: 'SET_AUTH_USER', payload: data });
        },
    });

    //  API Login Mutation
    const { mutate: loginUser, isLoading } = useMutation(
        (userData) => loginUserFn(userData),
        {
            onSuccess: () => {
                query.refetch();
                toast.success('You successfully logged in');
                navigate(from);
            },
            onError: (error) => useHandleError(error),
        }
    );

    const {
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = methods;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler = (values) => {
        // ? Executing the loginUser Mutation
        loginUser(values);
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh',
                backgroundColor: 'background.default',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    textAlign='center'
                    component='h1'
                    sx={{
                        color: 'text.primary',
                        fontWeight: 600,
                        fontSize: { xs: '2rem', md: '3rem' },
                        mb: 2,
                        letterSpacing: 1,
                    }}
                >
                    Welcome Back!
                </Typography>
                <Typography
                    variant='body1'
                    component='h2'
                    sx={{ color: '#e5e7eb', mb: 2 }}
                >
                    Login to have access!
                </Typography>

                <FormProvider {...methods}>
                    <Box
                        component='form'
                        onSubmit={handleSubmit(onSubmitHandler)}
                        noValidate
                        autoComplete='off'
                        maxWidth='27rem'
                        width='100%'
                        sx={{
                            backgroundColor: "#F2A157",
                            p: { xs: '1rem', sm: '2rem' },
                            borderRadius: 2,
                        }}
                    >
                        <FormInput name='email' label='Email Address' type='email' />
                        <FormInput name='password' label='Password' type='password' />

                        <LoadingButton
                            variant='contained'
                            sx={{ mt: 1, backgroundColor: '#393939' }}
                            fullWidth
                            disableElevation
                            type='submit'
                            loading={isLoading}
                        >
                            <Typography sx={{color:'white'}}>Login</Typography>
                        </LoadingButton>

                        <Typography sx={{ fontSize: '0.9rem', mt: '1rem' }}>
                            Need an account? <LinkItem to='/register'>Sign Up Here</LinkItem>
                        </Typography>
                    </Box>
                </FormProvider>
            </Box>
        </Container>
    );
};

export default LoginPage;
