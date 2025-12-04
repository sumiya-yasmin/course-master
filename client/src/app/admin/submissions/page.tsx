'use client';

import Navbar from '@/src/components/Navbar';
import { Card, CardContent } from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { useGetAllSubmission } from '@/src/hooks/useSubmission';

export default function AdminSubmissionsPage() {
   const { data: submissions , isLoading } = useGetAllSubmission();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchTerm="" onSearchChange={() => {}} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Student Submissions</h1>
        {isLoading ? <div>Loading...</div> : (
          <div className="grid gap-4">
             {submissions?.length === 0 && (
              <div className="text-center py-20 text-gray-500 bg-white rounded-lg shadow-sm">
                <p className="text-xl font-semibold">No submissions yet.</p>
                <p className="text-sm">Students need to submit assignments from the Course Page.</p>
              </div>
            )}
            {submissions?.map((sub: any) => (
              <Card key={sub._id}>
                <CardContent className="p-6 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{sub.student?.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{sub.course?.title}</p>
                    
                    {sub.type === 'assignment' ? (
                      <div className="p-3 bg-gray-100 rounded text-sm font-mono border">
                        {sub.content}
                      </div>
                    ) : (
                      <div className="mt-2">
                        <Badge variant={sub.score >= 50 ? 'default' : 'destructive'} className="text-sm">
                          Quiz Score: {sub.score}%
                        </Badge>
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      Submitted: {new Date(sub.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="uppercase">{sub.type}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}