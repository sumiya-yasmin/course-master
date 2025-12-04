'use client';

import { useRouter } from 'next/navigation';
import { useCourses } from '@/src/hooks/useCourses';

import Navbar from '@/src/components/Navbar';

import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Trash2, PlusCircle, Users, Edit, FileText } from 'lucide-react';
import { useDeleteCourse } from '@/src/hooks/useAdmin';
import CourseCard from '@/src/components/CourseCard';

export default function AdminDashboard() {
  const router = useRouter();
  const { data, isLoading } = useCourses();
  const { mutate: deleteCourse, isPending: isDeleting } = useDeleteCourse();

  const handleDelete = (id: string) => {
    if (confirm('Delete this course permanently?')) {
      deleteCourse(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar searchTerm="" onSearchChange={() => {}} />

      <div className="container mx-auto px-4 py-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Manage courses, students, and reviews.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => router.push('/admin/enrollments')} 
              variant="outline" 
              className="bg-white hover:bg-gray-50 border-gray-300"
            >
                <Users className="mr-2 h-4 w-4" /> Enrollments
            </Button>

            <Button 
              onClick={() => router.push('/admin/submissions')} 
              variant="outline" 
              className="bg-white hover:bg-gray-50 border-gray-300"
            >
                <FileText className="mr-2 h-4 w-4" /> Submissions
            </Button>

            <Button 
              onClick={() => router.push('/admin/create-course')} 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
                <PlusCircle className="mr-2 h-4 w-4" /> Create Course
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
           <Card className="bg-white shadow-sm border-gray-200">
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium text-gray-500">Total Courses</CardTitle>
               <Users className="h-4 w-4 text-blue-500" />
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold">{data?.courses.length || 0}</div>
             </CardContent>
           </Card>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Course Management</h2>

        {isLoading ? (
          <div className="text-center py-20">Loading data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                footer={
                  <>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => router.push(`/admin/create-course?edit=${course._id}`)}
                    >
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    
                    <Button 
                      variant="destructive" 
                      className="flex-1"
                      disabled={isDeleting}
                      onClick={() => handleDelete(course._id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                  </>
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}