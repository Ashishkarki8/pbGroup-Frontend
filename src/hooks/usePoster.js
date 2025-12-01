// ========================================
// POSTER HOOKS - React Query for poster management
// ========================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import posterService from '../api/services/poster.service';
import toast from 'react-hot-toast';

// ========================================
// QUERY KEYS
// ========================================
export const POSTER_KEYS = {
  all: ['posters'],
  active: ['posters', 'active'],
  list: (filters) => ['posters', 'list', filters],
  detail: (id) => ['posters', 'detail', id],
};

// ========================================
// PUBLIC HOOKS
// ========================================

/**
 * Get active poster for public display
 * - Cached for 5 minutes
 * - Auto-refetch on window focus
 * - Optimized for fast loading
 */
export const useActivePoster = () => {
  return useQuery({
    queryKey: POSTER_KEYS.active,
    queryFn: posterService.getActive,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    retry: 2,
    select: (data) => data?.poster || null, // Return only poster object
  });
};

// ========================================
// ADMIN HOOKS
// ========================================

/**
 * Get all posters with filters (admin only)
 */
export const usePosters = (filters = {}) => {
  return useQuery({
    queryKey: POSTER_KEYS.list(filters),
    queryFn: () => posterService.getAll(filters),
    staleTime: 30 * 1000, // 30 seconds
  });
};

/**
 * Get single poster by ID (admin only)
 */
export const usePoster = (id) => {
  return useQuery({
    queryKey: POSTER_KEYS.detail(id),
    queryFn: () => posterService.getById(id),
    enabled: !!id,
  });
};

/**
 * Create new poster (admin only)
 */
export const useCreatePoster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: posterService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: POSTER_KEYS.all });
      queryClient.invalidateQueries({ queryKey: POSTER_KEYS.active });
      toast.success(data?.message || 'Poster created successfully');
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Failed to create poster';
      toast.error(message);
    },
  });
};

/**
 * Update poster (admin only)
 */
export const useUpdatePoster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => posterService.update(id, formData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: POSTER_KEYS.all });
      queryClient.invalidateQueries({ queryKey: POSTER_KEYS.active });
      queryClient.invalidateQueries({ queryKey: POSTER_KEYS.detail(variables.id) });
      toast.success(data?.message || 'Poster updated successfully');
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Failed to update poster';
      toast.error(message);
    },
  });
};

/**
 * Delete poster (admin only)
 */
export const useDeletePoster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: posterService.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: POSTER_KEYS.all });
      queryClient.invalidateQueries({ queryKey: POSTER_KEYS.active });
      toast.success(data?.message || 'Poster deleted successfully');
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Failed to delete poster';
      toast.error(message);
    },
  });
};