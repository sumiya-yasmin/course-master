'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { useStudentDashboard } from '@/src/hooks/useStudentDashboard';
import { Progress } from '@/src/components/ui/progress';
import Navbar from '@/src/components/Navbar';
import CourseCard from '@/src/components/CourseCard';

export default function StudentDashboard() {
  const { enrollments, isLoading } = useStudentDashboard();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEnrollments = enrollments?.filter((enrollment) =>
    enrollment.course.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading courses...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
            <p className="text-gray-500">Welcome back! Continue where you left off.</p>
          </div>
        </div>

        {filteredEnrollments.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow">
            {searchTerm ? (
               <h2 className="text-xl font-semibold mb-2">No courses match "{searchTerm}"</h2>
            ) : (
               <>
                <h2 className="text-xl font-semibold mb-2">You haven't enrolled in any courses yet.</h2>
                <Button onClick={() => router.push('/')}>Browse Courses</Button>
               </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEnrollments.map((enrollment) => (
           <CourseCard
                key={enrollment._id}
                course={enrollment.course} 
                progress={enrollment.progress}
                footer={
                  <Button 
                    className="w-full" 
                    onClick={() => router.push(`/course/${enrollment.course._id}`)}
                  >
                    {enrollment.progress > 0 ? 'Continue Learning' : 'Start Course'}
                  </Button>
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}