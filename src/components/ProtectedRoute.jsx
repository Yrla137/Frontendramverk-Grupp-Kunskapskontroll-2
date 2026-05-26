import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // if not logged in - back to homepage
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // if logged in - welcome!
  return children;
};

export default ProtectedRoute;