import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  createCourseApi,
  deleteCourseApi,
  getAdminEnrollmentsApi,
  updateCourseApi,
} from "../api/admin";
import { Error } from "../types/api";

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourseApi,
    onSuccess: () => {
      toast.success("Course deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: Error) => {
      toast.error(error.response?.data?.message || "Failed to delete course");
    },
  });
};

export const useCreateCourse = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourseApi,
    onSuccess: (newCourse) => {
      toast.success("Course created successfully!");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      router.push(`/course/${newCourse._id}`);
    },
    onError: (error: Error) => {
      toast.error(error.response?.data?.message || "Failed to create course");
    },
  });
};

export const useUpdateCourse = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCourseApi,
    onSuccess: (newCourse) => {
      toast.success("Course updated!");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      router.push(`/course/${newCourse._id}`);
    },
    onError: (error: Error) => {
      toast.error(error.response?.data?.message || "Failed to create course");
    },
  });
};

export const useViewEnrollments = () => {
  return useQuery({
    queryKey: ["admin-enrollments"],
    queryFn: getAdminEnrollmentsApi,
  });
};
