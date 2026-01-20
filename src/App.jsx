import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AuthModalProvider } from './contexts/AuthModalContext';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <AuthProvider>
      <AuthModalProvider>
        <AppRouter />
      </AuthModalProvider>
    </AuthProvider>
  );
}

export default App;

