import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // if not logged in - prompt to creacte account/login
  if (!isLoggedIn) {
    return <Navigate to="/Profile" replace />;
  }

  // if logged in - welcome!
  return children;
};

export default ProtectedRoute;