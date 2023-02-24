import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthMiddleware from '@/middlewares/AuthMiddleware';

import { ColorModeProvider } from '@/services/providers/ColorModeProvider'
import { AuthUserContextProvider } from '@/services/providers/AuthUserContextProvider'
import { AdvertisementContextProvider } from '@/services/providers/AdvertisementContextProvider';
import { LanguageModeContextProvider } from '@/services/providers/LanguageModeContext';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthUserContextProvider>
          <ColorModeProvider>
          <LanguageModeContextProvider>
            <AdvertisementContextProvider>
            <AuthMiddleware>
              <App />
            </AuthMiddleware>
            </AdvertisementContextProvider>
            </LanguageModeContextProvider>
          </ColorModeProvider>
        </AuthUserContextProvider>
        <ReactQueryDevtools initialisopen="{false}" />
      </Router>
    </QueryClientProvider>
  </React.StrictMode >,
)
