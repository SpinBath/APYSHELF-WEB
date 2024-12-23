import { BrowserRouter, Routes, Route, Router, Navigate } from 'react-router-dom'
import { BooksFormPage } from './pages/BooksFormPage'
import { AuthProvider } from './AuthContext'
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/main/main'

import Signin from './pages/Sign in/signin'
import Signon from './pages/Sign on/signon'
import HomePage from './pages/home/home'

import { BookRoutes } from './pages/books/BookRoutes';


import LoansPage from './pages/loans/loans'
import AccountPage from './pages/account/account'




function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signon" element={<Signon />} />

          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/*" element={<BookRoutes />} />
          <Route path="/loans" element={<ProtectedRoute><LoansPage /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />



        </Routes>
      </BrowserRouter>
    </AuthProvider >
  );
}

export default App