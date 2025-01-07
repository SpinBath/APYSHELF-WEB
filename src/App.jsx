import { BrowserRouter, Routes, Route, Router, Navigate } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/main/main';

import Signin from './pages/Sign in/signin'
import Signon from './pages/Sign on/signon'

import { BookRoutes } from './pages/books/BookRoutes';


import HomePage from './pages/home/home';
import LoansPage from './pages/loans/loans';
import AccountPage from './pages/account/account';





function App() {

  const isAuthenticated = localStorage.getItem("token") !== null;

  return (

    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Ruta inicial: redirige según el estado de autenticación */}
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/account" /> : <Navigate to="/main" />}
          />

          <Route path="/main" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signon" element={<Signon />} />

          {/* Protected Routes */}
          <Route path="/*" element={<BookRoutes />} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/loans" element={<ProtectedRoute><LoansPage /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />



        </Routes>
      </BrowserRouter>
    </AuthProvider >
  );
}

export default App