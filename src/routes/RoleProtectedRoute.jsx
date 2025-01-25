import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Import Redux's useSelector to access the role

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const role = useSelector(state => state.role.role);  // Get role from Redux store

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to a different page if the user doesn't have the required role
    return <Navigate to="/unauthorized" />;  // Redirect to a "Unauthorized" page or something else
  }

  return children || <Outlet />;
};

export default RoleProtectedRoute;
