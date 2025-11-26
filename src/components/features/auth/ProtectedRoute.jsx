// ========================================
// PROTECTED ROUTE COMPONENT
// Handles authentication and role-based access
// ========================================

import { Navigate } from 'react-router-dom';
import useAuthStore from '../../../store/authStore';
import { ROUTES } from '../../../utils/constants';

const ProtectedRoute = ({ children, requireSuperAdmin = false }) => {
  const { isAuthenticated, isSuperAdmin } = useAuthStore();

  // ========================================
  // CASE 1: Not authenticated
  // ========================================
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // ========================================
  // CASE 2: Super Admin required but user is not
  // ========================================
  if (requireSuperAdmin && !isSuperAdmin()) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  // ========================================
  // CASE 3: Authorized - render children
  // ========================================
  return children;
};

export default ProtectedRoute;