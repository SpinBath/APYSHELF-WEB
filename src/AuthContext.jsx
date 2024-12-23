import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    console.log('Token inicial desde localStorage:', authToken);
  }, [authToken]);

  const login = (token) => {
    console.log('Token logueado:', token);
    setAuthToken(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    console.log('Cerrando sesión');
    setAuthToken(null);
    localStorage.removeItem('token');
  };

  const isLoggedIn = !!authToken;

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);