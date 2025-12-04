"use client";

import Navbar from "@/src/components/Navbar";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useViewEnrollments } from "@/src/hooks/useAdmin";

export default function AdminEnrollmentsPage() {
  const router = useRouter();
  const { data: enrollments, isLoading } = useViewEnrollments();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchTerm="" onSearchChange={() => {}} />

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-4 pl-0"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Student Enrollments
          </h1>
        </div>

        {isLoading ? (
          <div className="text-center py-20">Loading records...</div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Total Records: {enrollments?.length || 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 rounded-tl-lg">Student Name</th>
                      <th className="px-6 py-3">Student Email</th>
                      <th className="px-6 py-3">Course Title</th>
                      <th className="px-6 py-3">Batch Name</th>
                      <th className="px-6 py-3">Progress</th>
                      <th className="px-6 py-3 rounded-tr-lg">Enrolled Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments?.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center py-8 text-gray-500"
                        >
                          No enrollments found.
                        </td>
                      </tr>
                    )}
                    {enrollments?.map((item) => (
                      <tr
                        key={item._id}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {item.student?.name || "Unknown User"}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {item.student?.email}
                        </td>
                        <td className="px-6 py-4 font-medium text-blue-600">
                          {item.course?.title || "Deleted Course"}
                        </td>
                        <td className="px-6 py-4 font-medium text-blue-600">
                          {item.course?.batches &&
                          item.course.batches.length > 0
                            ? item.course.batches[0].title
                            : "Self-Paced"}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={
                              item.progress === 100 ? "default" : "secondary"
                            }
                          >
                            {item.progress}%
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
