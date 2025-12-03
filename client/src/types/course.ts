export interface Lesson {
  _id: string;
  title: string;
  videoUrl: string;
  duration: number;
  isFree: boolean;
}

export interface Batch {
  _id: string;
  title: string;
  startDate: string;
  endDate?: string;
  enrollmentClosed?: boolean;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  category: string;
  thumbnail: string;
  level: string;
  tags: string[];
  syllabus: Lesson[]; 
  batches: Batch[];
}

export interface CourseResponse {
  courses: Course[];
  pagination: {
    totalCourses: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface CourseParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export interface CreateCourseInput {
  title: string;
  description: string;
  price: number;
  instructor: string;
  category: string;
  thumbnail: string;
  level: string;
  tags: string[];
}
