import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth(); 

  return isLoggedIn ? children : <Navigate to="/main" />; 
};

export default ProtectedRoute;