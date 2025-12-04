import { useQuery } from "@tanstack/react-query";
import { getAllSubmissionsApi } from "../api/submission";

export const useGetAllSubmission = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-submissions'],
    queryFn: getAllSubmissionsApi,
  });

  return { 
    data: data || [], 
    isLoading, 
    error 
  };
};