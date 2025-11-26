// ========================================
// ZUSTAND AUTH STORE
// Manages: Current user, authentication status, UI state
// ========================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ROLES } from '../utils/constants';

// ========================================
// AUTH STORE
// ========================================
const useAuthStore = create(
  persist(
    (set, get) => ({
      hydrated: false,

      // ========================================
      // STATE
      // ========================================
      user: null, // Current logged-in user
      isAuthenticated: false,
      isLoading: false,
      
      // ========================================
      // ACTIONS
      // ========================================
      
      /**
       * Set user after successful login
       */
      setUser: (user) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },
      
      /**
       * Clear user on logout
       */
      clearUser: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
      
      /**
       * Update user data (e.g., after profile update)
       */
      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
      
      /**
       * Set loading state
       */
      setLoading: (isLoading) => {
        set({ isLoading });
      },
      
      // ========================================
      // COMPUTED VALUES (Getters)
      // ========================================
      
      /**
       * Check if current user is super admin
       */
      isSuperAdmin: () => {
        const { user } = get();
        return user?.role === ROLES.SUPER_ADMIN;
      },
      
      /**
       * Check if current user is normal admin
       */
      isNormalAdmin: () => {
        const { user } = get();
        return user?.role === ROLES.NORMAL_ADMIN;
      },
      
      /**
       * Get user's full name
       */
      getFullName: () => {
        const { user } = get();
        return user?.username || '';
      },
      
      /**
       * Get user's initials (for avatar)
       */
      getInitials: () => {
        const { user } = get();
        return user?.username ? user.username.slice(0, 2).toUpperCase() : '';
      },
      
      /**
       * Check if user can manage admins (Super Admin only)
       */
      canManageAdmins: () => {
        return get().isSuperAdmin();
      },
    }),
    {
      name: 'auth-storage', // LocalStorage key
      
      // Only persist user and isAuthenticated
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => {
        return () => {
          set({ hydrated: true });
        };
      },
    }
  )
);

if (typeof window === 'undefined') {
  useAuthStore.setState({ hydrated: true });
}

// ========================================
// EXPORT STORE
// ========================================
export default useAuthStore;

// ========================================
// EXPORT SELECTORS (for performance)
// ========================================

/**
 * Select only user
 */
export const useUser = () => useAuthStore((state) => state.user);

/**
 * Select only isAuthenticated
 */
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);

/**
 * Select only isSuperAdmin
 */
export const useIsSuperAdmin = () => useAuthStore((state) => state.isSuperAdmin());

/**
 * Select only loading state
 */
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);





// Yep—you can reuse the same loading spinner you already show elsewhere (the centered “react loading” indicator) for the rehydration guard.

// Plan:
// 1. Add a tiny state (e.g., `const [hydrated, setHydrated] = useState(false)`) in a root-level component such as `App.jsx` or `ProtectedRoute`.
// 2. Use Zustand’s `useEffect(() => setHydrated(true), [])` or `authStore.persist.onFinishHydration` to flip it once the store is ready.
// 3. Until `hydrated` is true, render your existing loading UI (the centered spinner). Once true, render the normal routes.

// That way the user sees the same loading animation they already recognize, and there’s no flicker between login/dashboard during hydration. Want me to wire that up now?