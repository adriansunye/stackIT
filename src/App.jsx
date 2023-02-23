import * as React from 'react';
import './App.css'
import  CssBaseline  from '@mui/material/CssBaseline';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from '@/routes/Routes';
import ProfilePage from './views/profile/ProfilePage';

function App() {
  const content = useRoutes(routes);
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <ProfilePage />
      {content}
      
    </>
  );
}

export default App;