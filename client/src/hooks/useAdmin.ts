import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createCourseApi, deleteCourseApi, updateCourseApi } from '../api/admin';

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourseApi,
    onSuccess: () => {
      toast.success('Course deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete course');
    },
  });
};

export const useCreateCourse = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourseApi,
    onSuccess: () => {
      toast.success('Course created successfully!');
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      router.push('/admin/dashboard'); 
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create course');
    },
  });
};

export const useUpdateCourse = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCourseApi,
    onSuccess: () => {
      toast.success('Course updated!');
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      router.push('/admin/dashboard');
    },
    onError: (_error: any) => {
      toast.error('Failed to update course');
    }
  });
};