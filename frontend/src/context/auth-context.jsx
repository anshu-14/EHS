import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { configureAxios } from '../axios/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  token: null,
  user: null, 
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

    const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    if (token) {
      dispatch({ type: 'LOGIN', payload: { token, user } });
    }
  }, []);

  const login = (token, user = null) => {
    localStorage.setItem('token', token);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    dispatch({ type: 'LOGIN', payload: { token, user } });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/login'); // Redirect to login page on logout
  };
  
  useEffect(() => {
    configureAxios(state.token, logout);
  }, [state.token]); // Re-run when token changes

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};