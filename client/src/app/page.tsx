"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCourses, useEnroll } from "@/src/hooks/useCourses";
import { useStudentDashboard } from "@/src/hooks/useStudentDashboard";
import Navbar from "@/src/components/Navbar";

import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import CourseCard from "../components/CourseCard";

export default function HomePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useCourses({ search: searchTerm });

  const { enrollments } = useStudentDashboard();

  const { mutate: enroll, isPending: isEnrolling } = useEnroll();

  const isEnrolled = (courseId: string) => {
    return enrollments?.some(
      (enrollment) => enrollment.course._id === courseId
    );
  };

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.role === "admin") setIsAdmin(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-blue-600 font-medium">
              Loading courses...
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Available Courses
              </h2>
              <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border shadow-sm">
                {data?.pagination.totalCourses || 0} results
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.courses.map((course) => {
                const alreadyEnrolled = isEnrolled(course._id);

                return (
                  <CourseCard
                    key={course._id}
                    course={course}
                    badges={
                      alreadyEnrolled && (
                        <Badge className="bg-green-500 text-white hover:bg-green-600">
                          Enrolled
                        </Badge>
                      )
                    }
                    footer={
                      <>
                        <Button
                          variant="outline"
                          className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
                          onClick={() => router.push(`/course/${course._id}`)}
                        >
                          Details
                        </Button>
                        {!isAdmin &&
                          (alreadyEnrolled ? (
                            <Button
                              className="flex-1 bg-green-600 hover:bg-green-700"
                              onClick={() => router.push("/student/dashboard")}
                            >
                              Go to Dashboard
                            </Button>
                          ) : (
                            <Button
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                              disabled={isEnrolling}
                              onClick={() => enroll(course._id)}
                            >
                              {isEnrolling ? "Enrolling..." : "Enroll Now"}
                            </Button>
                          ))}
                      </>
                    }
                  />
                );
              })}
            </div>

            {data?.courses.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700">
                  No courses found
                </h3>
                <p className="text-gray-500 mt-2">
                  Try searching for "React" or "Design"
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
