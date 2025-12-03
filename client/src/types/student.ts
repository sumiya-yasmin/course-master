export interface CourseSummary {
  _id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  level: string;
}

export interface Enrollment {
  _id: string;
  student: string;
  course: CourseSummary; 
  progress: number;     
  isCompleted: boolean;
  createdAt: string;
}