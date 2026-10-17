import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute() {
  const currentUser = useSelector((state) => state.auth.currentUser)

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />
}
