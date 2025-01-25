// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux'; // Use Redux state to check login status

// const ProtectedRoute = ({ children }) => {
//   const { token, user } = useSelector((state) => state.auth); // Get the authentication state from Redux
//   // If not authenticated, redirect to login page
//   if (!token ) {
//     return <Navigate to="/login" replace />;
//   }

//   // If authenticated, render the children (outlet of the protected routes)
//   return children;
// };

// export default ProtectedRoute;

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Use Redux state to check login status

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user } = useSelector((state) => state.auth); // Get the authentication state from Redux
  
  // If the user is not authenticated, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // If roles are provided, check if the user's role matches any of the allowed roles
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and role matches, render the children (protected route)
  return children;
};

export default ProtectedRoute;

