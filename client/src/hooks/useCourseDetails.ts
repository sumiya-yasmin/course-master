import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCourse, useEnroll } from "@/src/hooks/useCourses";
import { useStudentDashboard } from "@/src/hooks/useStudentDashboard";

import { submitAssignmentApi } from "@/src/api/submission";
import toast from "react-hot-toast";
import { Lesson } from "../types/course";
import { Error } from "../types/api";

export const useCourseDetails = (courseId: string) => {
  const { data: course, isLoading } = useCourse(courseId);
  const { enrollments, markComplete, isMarking } = useStudentDashboard();
  const { mutate: enroll, isPending: isEnrolling } = useEnroll();

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [assignmentText, setAssignmentText] = useState("");

  const isEnrolled = enrollments?.some((e) => e.course._id === courseId);
  const enrollment = enrollments?.find((e) => e.course._id === courseId);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.role === "admin") setIsAdmin(true);
    }
  }, []);

  const { mutate: submitWork, isPending: isSubmitting } = useMutation({
    mutationFn: submitAssignmentApi,
    onSuccess: (_data, variables) => {
      if (variables.type === "assignment") {
        toast.success("Assignment submitted successfully!");
        setAssignmentText("");
      } else {
        toast.success("Quiz score recorded!");
      }
    },
    onError: (error: Error) => {
      toast.error(error.response?.data?.message || "Failed to submit");
    },
  });

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const isLessonCompleted = (lessonId: string) => {
    return enrollment?.completedLessons.includes(lessonId);
  };

  const handleLessonClick = (lesson: Lesson) => {
    if (!isEnrolled && !lesson.isFree && !isAdmin) {
      toast.error("Enroll to watch this lesson!");
      return;
    }
    setActiveLesson(lesson);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAssignmentSubmit = () => {
    if (!assignmentText) return toast.error("Please enter content");
    submitWork({ courseId, type: "assignment", content: assignmentText });
  };

  const handleQuizComplete = (score: number) => {
    submitWork({ courseId, type: "quiz", score });
  };

  return {
    course,
    isLoading,
    isEnrolled,
    enrollment,
    isAdmin,
    activeLesson,
    assignmentText,

    isEnrolling,
    isMarking,
    isSubmitting,

    setAssignmentText,

    enroll,
    markComplete,
    handleLessonClick,
    handleAssignmentSubmit,
    handleQuizComplete,

    getYouTubeId,
    isLessonCompleted,
  };
};
