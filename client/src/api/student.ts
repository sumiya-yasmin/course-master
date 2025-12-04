import { Enrollment } from "../types/student";
import apiClient from "./axios";


export const getMyCoursesApi = async (): Promise<Enrollment[]> => {
  const response = await apiClient.get<Enrollment[]>('/enrollments/my-courses');
  return response.data;
};

export const markLessonCompleteApi = async ({ courseId, lessonId }: { courseId: string; lessonId: string }) => {
  const response = await apiClient.post('/enrollments/progress', { courseId, lessonId });
  return response.data;
};