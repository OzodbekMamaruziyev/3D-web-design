import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './admin/auth/AuthContext';
import './index.css';
import App from './App.tsx';

import { DataProvider } from './context/DataContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <App />
        </DataProvider>
        <Toaster position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
