
import React from 'react'
import Login from '../../../components/Login'

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
                minHeight: '100vh',
                backgroundColor: '#2363eb',
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
                        color: '#f9d13e',
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
                            backgroundColor: '#e5e7eb',
                            p: { xs: '1rem', sm: '2rem' },
                            borderRadius: 2,
                        }}
                    >
                        <FormInput name='email' label='Email Address' type='email' />
                        <FormInput name='password' label='Password' type='password' />

                        <Typography
                            sx={{ fontSize: '0.9rem', mb: '1rem', textAlign: 'right' }}
                        >
                            <LinkItem to='/' style={{ color: '#333' }}>
                                Forgot Password?
                            </LinkItem>
                        </Typography>

                        <LoadingButton
                            variant='contained'
                            sx={{ mt: 1 }}
                            fullWidth
                            disableElevation
                            type='submit'
                            loading={isLoading}
                        >
                            Login
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
