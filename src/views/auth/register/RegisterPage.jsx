import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { signUpUserFn } from '@/api/authApi';
import FormInput from '@/components/layout/forms/FormInput';


const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: #f9d13e;
  color: 'text.secondary';
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

const registerSchema = object({
  name: string().min(1, 'Full name is required').max(100),
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  phone: string()
    .min(1, 'Phone number is required'),
  role: string()
    .min(1, 'Role is required'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

const RegisterPage = () => {
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(registerSchema),
  });

  // ? Calling the Register Mutation
  const { mutate, isLoading } = useMutation(
    (userData) => signUpUserFn(userData),
    {
      onSuccess(data) {
        toast.success(data?.message);
        navigate('/');
      },
      onError(error) {
        if (Array.isArray((error).response.data.error)) {
          (error).response.data.error.forEach((el) =>
            toast.error(el.message, {
              position: 'top-right',
            })
          );
        } else {
          toast.error((error).response.data.message, {
            position: 'top-right',
          });
        }
      },
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
    // ? Execute the Mutation
    mutate(values);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'background.default',
        mb:5
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
            color: 'text.secondary',
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 600,
            mb: 2,
            letterSpacing: 1,
          }}
        >
          Join us!
        </Typography>
        <Typography component='h2' sx={{ color: 'text.secondary', mb: 2 }}>
          Sign Up To Get Started!
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
              backgroundColor: '#F2A157',
              p: { xs: '1rem', sm: '2rem' },
              borderRadius: 2,
            }}
          >
            <FormInput name='name' label='Full Name' />
            <FormInput name='email' label='Email Address' type='email' />
            <FormInput name='phone' label='Phone number' />
            <FormInput name='role' label='Role' />
            <FormInput name='password' label='Password' type='password' />
            <FormInput
              name='passwordConfirm'
              label='Confirm Password'
              type='password'
            />
            

            <LoadingButton
              variant='contained'
              sx={{ mt: 1, backgroundColor: '#393939', color:'white' }}
              fullWidth
              disableElevation
              type='submit'
              loading={isLoading}
            >
              Sign Up
            </LoadingButton>
            <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
              Already have an account?{' '}
              <LinkItem to='/login'>Login Here</LinkItem>
            </Typography>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default RegisterPage;
