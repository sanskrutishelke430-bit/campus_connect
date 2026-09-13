import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    // Logged in, but wrong role — send them to their own dashboard instead
    return <Navigate to={user.role === 'student' ? '/dashboard' : '/admin'} replace />
  }

  return children
}

export default ProtectedRoute