import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

function PrivateRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/vuchada/login" replace />;
  }

  return children;
}

export default PrivateRoute;