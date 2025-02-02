import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { infoUser } from '../api/user.api';

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/main" />;
};

export async function isStaff() {
  const user = await infoUser(localStorage.getItem('token'));
  return user.data.is_staff
};

export default ProtectedRoute;