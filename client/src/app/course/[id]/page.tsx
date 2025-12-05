import { Suspense } from "react";
import CourseDetailsPage from "./CoursePage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <CourseDetailsPage />
    </Suspense>
  );
}
