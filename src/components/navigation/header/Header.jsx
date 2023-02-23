import { AppBar, Box, Container, FormControl, MenuItem, Select, Toolbar, Typography, useTheme } from '@mui/material';
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
import logo from "@/assets/LogoStackIT.png";
import { useLanguageModeContext } from '../../../services/providers/LanguageModeContext';



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
    const languageModeContext = useLanguageModeContext();
    const languageMode = languageModeContext.state.languageMode
    const languageChange = languageMode === 'Es' ? 'En' : 'Es';

    const user = authUserContext.state.authUser;

    const colorMode = useColorMode();
    const theme = useTheme();


    const handleClick = (event) => {
        colorMode.toggleColorMode();
    }

    const handleChange = (event) => {
        languageModeContext.dispatch({ type: 'SET_LANGUAGE_MODE', payload: languageChange });
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
                        <img className="imgLogo" height={50} src={logo} alt="logo" />
                        <Typography
                            variant='h6'
                            onClick={() => navigate('/')}
                            sx={{ cursor: 'pointer' }}
                        >

                        </Typography>
                        <Box display='flex' sx={{ ml: 'auto' }}>
                            <Box sx={{ mt: 2, mr: { md: 3 } }}>
                                {theme.palette.mode === "light" ? <LightModeIcon onClick={handleClick} sx={{ color: '#858585' }} /> : <DarkModeIcon onClick={handleClick} sx={{ color: '#858585' }} />}
                            </Box>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={languageMode}
                                onChange={handleChange}
                            >
                                <MenuItem value={languageMode}>{languageMode}</MenuItem>
                                <MenuItem value={languageChange}>{languageChange}</MenuItem>
                            </Select>

                            {!user && (
                                <>
                                    <LoadingButton onClick={() => navigate('/services')}>
                                        <Typography sx={{ color: 'text.secondary' }}>
                                            {languageModeContext.state.texts.header.services}
                                        </Typography>
                                    </LoadingButton>
                                    <LoadingButton onClick={() => navigate('/login')}>
                                        <Typography sx={{ color: 'text.secondary' }}>
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
                                        <Typography sx={{ color: 'text.secondary' }}>
                                            {languageModeContext.state.texts.header.profile}
                                        </Typography>
                                    </LoadingButton>
                                    <LoadingButton onClick={onLogoutHandler} loading={isLoading}>
                                        <Typography sx={{ color: 'text.secondary' }}>
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
