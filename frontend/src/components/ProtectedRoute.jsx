import {Navigate, Outlet} from "react-router-dom"
import useAuthStore from "../store/useAuthStore"

function ProtectedRoute() {
  const isAuthenticated = useAuthStore(state => state.accessToken) != null
  return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace />
}

export default ProtectedRoute