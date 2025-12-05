import { Course, CourseParams, CourseResponse } from "../types/course";
import apiClient from "./axios";

export const getAllCoursesApi = async (params?: CourseParams) => {
  const response = await apiClient.get<CourseResponse>("/courses", { params });
  return response.data;
};

export const getCourseByIdApi = async (id: string) => {
  const response = await apiClient.get<Course>(`/courses/${id}`);
  return response.data;
};

export const enrollCourseApi = async (courseId: string) => {
  const response = await apiClient.post("/enrollments", { courseId });
  return response.data;
};
