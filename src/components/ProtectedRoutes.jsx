import React, { useContext, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import Spinner from './spinner'

const ProtectedRoutes = () => {
  const { isAuthenticated, loading, authenticate } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (!isAuthenticated && !loading) {
          await authenticate();
        }
      } catch (error) {
        console.error("Authentication error", error);
        // handle error here, maybe navigate to a specific error page or show a notification
      }
    };
    initializeAuth();
  }, [isAuthenticated, loading, authenticate]);

  if (loading) {
    return <Spinner />;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location.pathname }} replace />
  );
};

export default ProtectedRoutes;
