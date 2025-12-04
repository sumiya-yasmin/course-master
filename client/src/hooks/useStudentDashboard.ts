import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { getMyCoursesApi, markLessonCompleteApi } from '../api/student';
import toast from 'react-hot-toast';

export const useStudentDashboard = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsEnabled(!!token);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['my-courses'],
    queryFn: getMyCoursesApi,
    enabled: isEnabled, 
    retry: false,
  });

  const { mutate: markComplete, isPending: isMarking } = useMutation({
    mutationFn: markLessonCompleteApi,
    onSuccess: () => {
      toast.success('Progress updated!');
      queryClient.invalidateQueries({ queryKey: ['my-courses'] });
    },
    onError: (_err: any) => {
      toast.error('Failed to update progress');
    }
  });

  return { 
    enrollments: data || [], 
    isLoading: isEnabled && isLoading, 
    error,
    markComplete, 
    isMarking 
  };
};