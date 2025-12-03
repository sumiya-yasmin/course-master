'use client';

import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation'; 
import { useCourse } from '@/src/hooks/useCourses'; 

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Label } from '@/src/components/ui/label';
import { ArrowLeft, Trash2, Plus } from 'lucide-react';
import Navbar from '@/src/components/Navbar';
import { useCreateCourse, useUpdateCourse } from '@/src/hooks/useAdmin';


export default function CreateCoursePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editCourseId = searchParams.get('edit');
  const isEditMode = !!editCourseId;

  const { data: existingCourse, isLoading: isLoadingCourse } = useCourse(editCourseId);

  const { mutate: createCourse, isPending: isCreating } = useCreateCourse();
  const { mutate: updateCourse, isPending: isUpdating } = useUpdateCourse();

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      category: 'Development',
      level: 'Beginner',
      thumbnail: '',
      instructor: 'Admin User',
      syllabus: [{ title: 'Introduction', videoUrl: '', duration: 10, isFree: true }],
      batches: [{ title: 'Batch 1', startDate: '' }] 
    }
  });

  useEffect(() => {
    if (existingCourse && isEditMode) {
      const courseData = existingCourse as any;
      
      const formattedBatches = courseData.batches?.map((b: any) => ({
        ...b,
        startDate: b.startDate.split('T')[0]
      })) || [{ title: 'Batch 1', startDate: '' }];

      reset({
        ...existingCourse,
        batches: formattedBatches
      });
    }
  }, [existingCourse, isEditMode, reset]);

  const { fields: lessonFields, append: addLesson, remove: removeLesson } = useFieldArray({
    control,
    name: "syllabus"
  });

  const { fields: batchFields, append: addBatch, remove: removeBatch } = useFieldArray({
    control,
    name: "batches"
  });

  const onSubmit = (data: any) => {
    const formattedData = { 
        ...data, 
        price: Number(data.price),
    };

    if (isEditMode) {
      updateCourse({ id: editCourseId!, data: formattedData });
    } else {
      createCourse(formattedData);
    }
  };

  if (isEditMode && isLoadingCourse) {
    return <div className="flex h-screen justify-center items-center">Loading Course Data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchTerm="" onSearchChange={() => {}} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" className="mb-4 pl-0" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditMode ? 'Edit Course' : 'Create New Course'}
            </h1>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Course Title</Label>
                <Input {...register('title', { required: 'Title is required' })} />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea {...register('description', { required: true })} rows={4} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price ($)</Label>
                  <Input type="number" {...register('price', { required: true })} />
                </div>
                <div className="space-y-2">
                   <Label>Category</Label>
                   <Input {...register('category', { required: true })} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Thumbnail Image URL</Label>
                <Input {...register('thumbnail', { required: true })} />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Syllabus & Videos</CardTitle>
              <Button type="button" size="sm" onClick={() => addLesson({ title: '', videoUrl: '', duration: 0, isFree: false })}>
                <Plus className="mr-2 h-4 w-4" /> Add Lesson
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {lessonFields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end border p-4 rounded-lg bg-gray-50">
                  <div className="flex-1 space-y-2">
                    <Label>Lesson Title</Label>
                    <Input {...register(`syllabus.${index}.title` as const, { required: true })} placeholder="Lesson Name" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>Video URL</Label>
                    <Input {...register(`syllabus.${index}.videoUrl` as const, { required: true })} placeholder="YouTube URL" />
                  </div>
                  <Button type="button" variant="destructive" size="icon" onClick={() => removeLesson(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Batches</CardTitle>
              <Button type="button" size="sm" onClick={() => addBatch({ title: '', startDate: '' })}>
                <Plus className="mr-2 h-4 w-4" /> Add Batch
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {batchFields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end border p-4 rounded-lg bg-gray-50">
                  <div className="flex-1 space-y-2">
                    <Label>Batch Name</Label>
                    <Input {...register(`batches.${index}.title` as const, { required: true })} placeholder="Winter 2025" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" {...register(`batches.${index}.startDate` as const, { required: true })} />
                  </div>
                  <Button type="button" variant="destructive" size="icon" onClick={() => removeBatch(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full bg-blue-600 mb-20" disabled={isCreating || isUpdating}>
            {isCreating || isUpdating ? 'Saving...' : (isEditMode ? 'Update Course' : 'Create Course')}
          </Button>
        </form>
      </div>
    </div>
  );
}