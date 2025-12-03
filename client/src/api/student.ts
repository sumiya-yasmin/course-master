import { Enrollment } from "../types/student";
import apiClient from "./axios";


export const getMyCoursesApi = async (): Promise<Enrollment[]> => {
  const response = await apiClient.get<Enrollment[]>('/enrollments/my-courses');
  return response.data;
};