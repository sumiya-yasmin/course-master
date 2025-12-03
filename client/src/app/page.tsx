"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCourses, useEnroll } from "@/src/hooks/useCourses";
import { useStudentDashboard } from "@/src/hooks/useStudentDashboard"; // Import this to check status
import Navbar from "@/src/components/Navbar";

// UI Components
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

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
                  <Card
                    key={course._id}
                    className="hover:shadow-lg transition-all duration-300 border-gray-200"
                  >
                    <div className="h-48 bg-gray-100 w-full relative group">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 right-3 bg-white/90 text-black backdrop-blur-sm shadow-sm hover:bg-white">
                        {course.level}
                      </Badge>
                      {alreadyEnrolled && (
                        <Badge className="absolute top-3 left-3 bg-green-500 text-white shadow-sm hover:bg-green-600">
                          Enrolled
                        </Badge>
                      )}
                    </div>

                    <CardHeader>
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">
                            {course.category}
                          </p>
                          <CardTitle className="text-lg leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
                            {course.title}
                          </CardTitle>
                        </div>
                        <span className="text-lg font-bold text-green-700">
                          ${course.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 font-medium">
                        By {course.instructor}
                      </p>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {course.description}
                      </p>
                    </CardContent>

                    <CardFooter className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
                        onClick={() => router.push(`/course/${course._id}`)}
                      >
                        Details
                      </Button>

                      {alreadyEnrolled ? (
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
                      )}
                    </CardFooter>
                  </Card>
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
