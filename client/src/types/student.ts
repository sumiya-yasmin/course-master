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
  completedLessons: string[];
  createdAt: string;
}

export interface AdminEnrollment {
  _id: string;
  student: { name: string; email: string };
  course: {
    title: string;
    price: number;
    batches?: { title: string }[];
  };
  progress: number;
  createdAt: string;
}

export interface Submission {
  _id: string;
  type: "quiz" | "assignment";
  score: number;
  content?: string;
  createdAt: string;
  student?: {
    name: string;
    email: string;
  };
  course?: {
    _id: string;
    title: string;
  };
}
