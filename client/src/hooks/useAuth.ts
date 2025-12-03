import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { loginUserApi, registerUserApi } from '../api/auth'; 

export const useLogin = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (response) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({ 
        name: response.name, 
        role: response.role 
      }));

      toast.success(`Welcome back, ${response.name}!`);

      if (response.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
    },
  });

  return { 
    login: mutation.mutate,
    isLoading: mutation.isPending 
  };
};


export const useRegister = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: registerUserApi,
    onSuccess: (response) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({ 
        name: response.name, 
        role: response.role 
      }));

      toast.success(`Account created! Welcome, ${response.name}`);
      
      router.push('/student/dashboard');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
    },
  });

  return { 
    registerUser: mutation.mutate,
    isLoading: mutation.isPending 
  };
};