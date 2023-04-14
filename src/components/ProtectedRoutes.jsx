import React, { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

const ProtectedRoutes = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location.pathname }} replace />
  );
};

export default ProtectedRoutes;