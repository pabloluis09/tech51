import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../components/context/AuthContext"

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />
  }

  return children
}