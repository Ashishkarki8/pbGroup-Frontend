// // ========================================
// // CUSTOM HOOK: useAdmin
// // Handles all admin management operations with React Query
// // ========================================

// import { useMutation, useQuery } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import adminService from '../api/services/admin.service';
// import {
//   queryKeys,
//   invalidateAdminList,
//   invalidateAdminStats,
//   invalidateAdminDetail,
// } from '../lib/react-query';
// import { TOAST_MESSAGES } from '../utils/constants';

// // ========================================
// // HOOK: useAdminStats
// // Get admin statistics
// // ========================================
// export const useAdminStats = () => {
//   return useQuery({
//     queryKey: queryKeys.admin.stats(),
//     queryFn: adminService.getStats,
//     staleTime: 2 * 60 * 1000, // 2 minutes
//   });
// };

// // ========================================
// // HOOK: useAdminList
// // Get paginated admin list with filters
// // ========================================
// export const useAdminList = (filters = {}) => {
//   return useQuery({
//     queryKey: queryKeys.admin.list(filters),
//     queryFn: () => adminService.getAll(filters),
//     staleTime: 3 * 60 * 1000, // 3 minutes
//     keepPreviousData: true, // Keep old data while fetching new
//   });
// };

// // ========================================
// // HOOK: useAdminDetail
// // Get single admin by ID
// // ========================================
// export const useAdminDetail = (id) => {
//   return useQuery({
//     queryKey: queryKeys.admin.detail(id),
//     queryFn: () => adminService.getById(id),
//     enabled: !!id, // Only fetch if ID exists
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// };

// // ========================================
// // HOOK: useCreateAdmin
// // Create new admin
// // ========================================
// export const useCreateAdmin = () => {
//   return useMutation({
//     mutationFn: adminService.create,
//     onSuccess: (data) => {
//       toast.success(TOAST_MESSAGES.ADMIN_CREATED);
//       invalidateAdminList();
//       invalidateAdminStats();
//     },
//     onError: (error) => {
//       const message = error.response?.data?.message || 'Failed to create admin';
//       toast.error(message);
//     },
//   });
// };

// // ========================================
// // HOOK: useDeactivateAdmin
// // Deactivate admin
// // ========================================
// export const useDeactivateAdmin = () => {
//   return useMutation({
//     mutationFn: ({ id, reason }) => adminService.deactivate(id, reason),
//     onSuccess: (data, variables) => {
//       toast.success('Admin deactivated successfully');
//       invalidateAdminList();
//       invalidateAdminStats();
//       invalidateAdminDetail(variables.id);
//     },
//     onError: (error) => {
//       const message = error.response?.data?.message || 'Failed to deactivate admin';
//       toast.error(message);
//     },
//   });
// };

// // ========================================
// // HOOK: useReactivateAdmin
// // Reactivate admin
// // ========================================
// export const useReactivateAdmin = () => {
//   return useMutation({
//     mutationFn: adminService.reactivate,
//     onSuccess: (data, id) => {
//       toast.success('Admin reactivated successfully');
//       invalidateAdminList();
//       invalidateAdminStats();
//       invalidateAdminDetail(id);
//     },
//     onError: (error) => {
//       const message = error.response?.data?.message || 'Failed to reactivate admin';
//       toast.error(message);
//     },
//   });
// };

// // ========================================
// // HOOK: useResetAdminPassword
// // Reset admin password
// // ========================================
// export const useResetAdminPassword = () => {
//   return useMutation({
//     mutationFn: ({ id, newPassword }) => adminService.resetPassword(id, newPassword),
//     onSuccess: () => {
//       toast.success(TOAST_MESSAGES.PASSWORD_RESET);
//     },
//     onError: (error) => {
//       const message = error.response?.data?.message || 'Failed to reset password';
//       toast.error(message);
//     },
//   });
// };

// // ========================================
// // HOOK: useDeleteAdmin
// // Delete admin permanently
// // ========================================
// export const useDeleteAdmin = () => {
//   return useMutation({
//     mutationFn: adminService.delete,
//     onSuccess: (data, id) => {
//       toast.success(TOAST_MESSAGES.ADMIN_DELETED);
//       invalidateAdminList();
//       invalidateAdminStats();
//     },
//     onError: (error) => {
//       const message = error.response?.data?.message || 'Failed to delete admin';
//       toast.error(message);
//     },
//   });
// };

// // ========================================
// // COMBINED HOOK: useAdminManagement
// // All admin operations in one hook
// // ========================================
// export const useAdminManagement = () => {
//   const createAdmin = useCreateAdmin();
//   const deactivateAdmin = useDeactivateAdmin();
//   const reactivateAdmin = useReactivateAdmin();
//   const resetPassword = useResetAdminPassword();
//   const deleteAdmin = useDeleteAdmin();

//   return {
//     // Mutations
//     createAdmin: createAdmin.mutate,
//     deactivateAdmin: deactivateAdmin.mutate,
//     reactivateAdmin: reactivateAdmin.mutate,
//     resetPassword: resetPassword.mutate,
//     deleteAdmin: deleteAdmin.mutate,

//     // Loading states
//     isCreating: createAdmin.isPending,
//     isDeactivating: deactivateAdmin.isPending,
//     isReactivating: reactivateAdmin.isPending,
//     isResettingPassword: resetPassword.isPending,
//     isDeleting: deleteAdmin.isPending,

//     // Mutation objects (for advanced usage)
//     createAdminMutation: createAdmin,
//     deactivateAdminMutation: deactivateAdmin,
//     reactivateAdminMutation: reactivateAdmin,
//     resetPasswordMutation: resetPassword,
//     deleteAdminMutation: deleteAdmin,
//   };
// };

// export default useAdminManagement;





// ========================================
// CUSTOM HOOK: useAdmin
// Handles all admin management operations with React Query
// ========================================

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import adminService from '../api/services/admin.service';
import posterService from '../api/services/poster.service';
import {
  queryKeys,
  invalidateAdminList,
  invalidateAdminStats,
  invalidateAdminDetail,
} from '../lib/react-query';
import { TOAST_MESSAGES } from '../utils/constants';

// ========================================
// HOOK: useAdminStats
// Get admin statistics
// ========================================
export const useAdminStats = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.admin.stats(),
    queryFn: adminService.getStats,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

// ========================================
// HOOK: useAdminList
// Get paginated admin list with filters
// ========================================
export const useAdminList = (filters = {}) => {
  return useQuery({
    queryKey: queryKeys.admin.list(filters),
    queryFn: () => adminService.getAll(filters),
    staleTime: 3 * 60 * 1000,
    keepPreviousData: true,
  });
};

// ========================================
// HOOK: useAdminDetail
// ========================================
export const useAdminDetail = (id) => {
  return useQuery({
    queryKey: queryKeys.admin.detail(id),
    queryFn: () => adminService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// ========================================
// HOOK: useCreateAdmin
// ========================================
export const useCreateAdmin = () => {
  return useMutation({
    mutationFn: adminService.create,
    onSuccess: () => {
      toast.success(TOAST_MESSAGES.ADMIN_CREATED);
      invalidateAdminList();
      invalidateAdminStats();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create admin');
    },
  });
};

// ========================================
// HOOK: useDeactivateAdmin
// ========================================
export const useDeactivateAdmin = () => {
  return useMutation({
    mutationFn: ({ id, reason }) => adminService.deactivate(id, reason),
    onSuccess: (_, variables) => {
      toast.success('Admin deactivated successfully');
      invalidateAdminList();
      invalidateAdminStats();
      invalidateAdminDetail(variables.id);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to deactivate admin');
    },
  });
};

// ========================================
// HOOK: useReactivateAdmin
// ========================================
export const useReactivateAdmin = () => {
  return useMutation({
    mutationFn: adminService.reactivate,
    onSuccess: (_, id) => {
      toast.success('Admin reactivated successfully');
      invalidateAdminList();
      invalidateAdminStats();
      invalidateAdminDetail(id);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to reactivate admin');
    },
  });
};

// ========================================
// HOOK: useResetAdminPassword
// ========================================
export const useResetAdminPassword = () => {
  return useMutation({
    mutationFn: ({ id, newPassword }) =>
      adminService.resetPassword(id, newPassword),
    onSuccess: () => {
      toast.success(TOAST_MESSAGES.PASSWORD_RESET);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    },
  });
};

// ========================================
// HOOK: useDeleteAdmin
// ========================================
export const useDeleteAdmin = () => {
  return useMutation({
    mutationFn: adminService.delete,
    onSuccess: () => {
      toast.success(TOAST_MESSAGES.ADMIN_DELETED);
      invalidateAdminList();
      invalidateAdminStats();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete admin');
    },
  });
};

// ========================================
// HOOK: usePosterList
// Get paginated poster list with filters
// ========================================
export const usePosterList = (filters = {}) => {
  return useQuery({
    queryKey: ['poster-list', filters],
    queryFn: () => posterService.getAll(filters),
    staleTime: 3 * 60 * 1000,
    keepPreviousData: true,
  });
};

// ========================================
// HOOK: usePosterDetail
// Get single poster by ID
// ========================================
export const usePosterDetail = (id) => {
  return useQuery({
    queryKey: ['poster-detail', id],
    queryFn: () => posterService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// ========================================
// HOOK: useCreatePoster
// Create new poster
// ========================================
export const useCreatePoster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: posterService.create,
    onSuccess: () => {
      toast.success('Poster created successfully');
      queryClient.invalidateQueries({ queryKey: ['poster-list'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create poster');
    },
  });
};

// ========================================
// HOOK: useUpdatePoster
// Update poster
// ========================================
export const useUpdatePoster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => posterService.update(id, formData),
    onSuccess: (_, variables) => {
      toast.success('Poster updated successfully');
      queryClient.invalidateQueries({ queryKey: ['poster-list'] });
      queryClient.invalidateQueries({ queryKey: ['poster-detail', variables.id] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update poster');
    },
  });
};

// ========================================
// HOOK: useDeletePoster
// Delete poster
// ========================================
export const useDeletePoster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: posterService.delete,
    onSuccess: () => {
      toast.success('Poster deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['poster-list'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete poster');
    },
  });
};

// ========================================
// COMBINED HOOK: useAdminManagement
// ========================================
export const useAdminManagement = () => {
  const createAdmin = useCreateAdmin();
  const deactivateAdmin = useDeactivateAdmin();
  const reactivateAdmin = useReactivateAdmin();
  const resetPassword = useResetAdminPassword();
  const deleteAdmin = useDeleteAdmin();

  return {
    createAdmin: createAdmin.mutate,
    deactivateAdmin: deactivateAdmin.mutate,
    reactivateAdmin: reactivateAdmin.mutate,
    resetPassword: resetPassword.mutate,
    deleteAdmin: deleteAdmin.mutate,

    isCreating: createAdmin.isPending,
    isDeactivating: deactivateAdmin.isPending,
    isReactivating: reactivateAdmin.isPending,
    isResettingPassword: resetPassword.isPending,
    isDeleting: deleteAdmin.isPending,

    createAdminMutation: createAdmin,
    deactivateAdminMutation: deactivateAdmin,
    reactivateAdminMutation: reactivateAdmin,
    resetPasswordMutation: resetPassword,
    deleteAdminMutation: deleteAdmin,
  };
};

// ========================================
// COMBINED HOOK: usePosterManagement
// ========================================
export const usePosterManagement = () => {
  const createPoster = useCreatePoster();
  const updatePoster = useUpdatePoster();
  const deletePoster = useDeletePoster();

  return {
    createPoster: createPoster.mutate,
    updatePoster: updatePoster.mutate,
    deletePoster: deletePoster.mutate,

    isCreating: createPoster.isPending,
    isUpdating: updatePoster.isPending,
    isDeleting: deletePoster.isPending,

    createPosterMutation: createPoster,
    updatePosterMutation: updatePoster,
    deletePosterMutation: deletePoster,
  };
};

export default useAdminManagement;
