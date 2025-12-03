import { CreateCourseInput } from "../types/course";
import apiClient from "./axios";

export const createCourseApi = async (data: CreateCourseInput) => {
  const response = await apiClient.post('/courses', data);
  return response.data;
};

export const updateCourseApi = async ({ id, data }: { id: string; data: any }) => {
  const response = await apiClient.put(`/courses/${id}`, data);
  return response.data;
};

export const deleteCourseApi = async (id: string) => {
  const response = await apiClient.delete(`/courses/${id}`);
  return response.data;
};