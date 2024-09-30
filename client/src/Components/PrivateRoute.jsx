import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoute = ({ component: Component, managerOnly = false, ...otherProps }) => {
  const { isAuthenticated, isManager, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (managerOnly && !isManager) {
    return <Navigate to='/not-authorized' state={{ from: location }} />;
  }

  return <Component {...otherProps} />;
};

export default PrivateRoute;
