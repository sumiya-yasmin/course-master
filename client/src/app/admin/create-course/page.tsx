import { Suspense } from "react";
import CreateCoursePage from "./createCoursePage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateCoursePage />
    </Suspense>
  );
}
