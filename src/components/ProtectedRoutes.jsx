import React, { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import Spinner from './spinner'

const ProtectedRoutes = () => {
  const { user, loading } = useContext(AuthContext); // Add loading here
  const location = useLocation();

  // If the authentication status is still being determined, show a loading message or spinner
  if (loading) {
    return <Spinner />;
  }

  // If the user is authenticated, show the protected content
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location.pathname }} replace />
  );
};

export default ProtectedRoutes;