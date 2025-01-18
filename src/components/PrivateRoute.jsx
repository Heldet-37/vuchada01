import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/vuchada/login" replace />;
  }

  return children;
}

export default PrivateRoute;