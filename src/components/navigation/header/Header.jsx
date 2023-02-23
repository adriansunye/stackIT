import { AppBar, Box, Container, Toolbar, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { useAuthUserContext } from '@/services/providers/AuthUserContextProvider';
import { useMutation } from '@tanstack/react-query';
import { logoutUserFn } from '@/api/authApi';
import useHandleError from '@/services/hooks/useHandleError';
import useColorMode from '@/services/providers/ColorModeProvider';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


const LoadingButton = styled(_LoadingButton)`
  padding: 0.4rem;
  color: #222;
  font-weight: 500;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Header = () => {
    const navigate = useNavigate();
    const authUserContext = useAuthUserContext();
    const user = authUserContext.state.authUser;

    const colorMode = useColorMode();
    const theme = useTheme();


    const handleClick = (event) => {
            colorMode.toggleColorMode();
    }

    const { mutate: logoutUser, isLoading } = useMutation(
        async () => await logoutUserFn(),
        {
            onSuccess: (data) => {
                window.location.href = '/login';
            },
            onError: (error) => useHandleError(error),
        }
    );

    const onLogoutHandler = async () => {
        logoutUser();
    };

    return (
        <>
            <AppBar position='static' style={{ background: 'transparent', boxShadow: 'none', color: 'text.secondary' }}>
                <Container maxWidth='lg'>
                    <Toolbar>
                        <Typography
                            variant='h6'
                            onClick={() => navigate('/')}
                            sx={{ cursor: 'pointer' }}
                        >
                            Logo
                        </Typography>
                        <Box display='flex' sx={{ ml: 'auto' }}>
                        {theme.palette.mode === "light" ? <LightModeIcon onClick={handleClick} sx={{ color: '#858585' }} /> : <DarkModeIcon onClick={handleClick} sx={{ color: '#858585' }} />}
                            <LoadingButton onClick={() => navigate('/services')}>
                                <Typography sx={{  color: 'text.secondary' }}>
                                    Services
                                </Typography>
                            </LoadingButton>
                            {!user && (
                                <>
                                    <LoadingButton
                                        
                                        onClick={() => navigate('/register')
                                        }
                                    >
                                        <Typography sx={{  color: 'text.secondary' }}>
                                            Signup
                                        </Typography>
                                    </LoadingButton>
                                    <LoadingButton onClick={() => navigate('/login')}>
                                        <Typography sx={{  color: 'text.secondary' }}>
                                            Login
                                        </Typography>
                                    </LoadingButton>
                                </>
                            )}
                            {user && (
                                <>
                                    <LoadingButton
                                        loading={isLoading}
                                        onClick={() => navigate('/profile')}
                                    >
                                        <Typography sx={{  color: 'text.secondary' }}>
                                            Profile
                                        </Typography>
                                    </LoadingButton>
                                    <LoadingButton onClick={onLogoutHandler} loading={isLoading}>
                                        <Typography sx={{  color: 'text.secondary' }}>
                                            Logout
                                        </Typography>
                                    </LoadingButton>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default Header;
