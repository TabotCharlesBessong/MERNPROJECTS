import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const AuthRoute = ({children}) => {
  const {user} = useAuth()
  const location = useLocation()
  return user ? (
    children
  ) : (
    <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
  );
}

export default AuthRoute