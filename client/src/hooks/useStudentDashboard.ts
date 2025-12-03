import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { getMyCoursesApi } from '../api/student';

export const useStudentDashboard = () => {
  const [isEnabled, setIsEnabled] = useState(false);

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

  return { 
    enrollments: data || [], 
    isLoading: isEnabled && isLoading, 
    error 
  };
};