import Submission from "../models/Submission.js";

export const createSubmissionService = async ({
  userId,
  courseId,
  type,
  content,
  score,
}) => {
  const submission = await Submission.create({
    student: userId,
    course: courseId,
    type,
    content,
    score,
  });
  return submission;
};

export const getAllSubmissionsService = async () => {
  return await Submission.find()
    .populate("student", "name email")
    .populate("course", "title")
    .sort({ createdAt: -1 });
};
