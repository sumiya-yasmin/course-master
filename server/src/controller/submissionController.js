import * as submissionService from "../services/submissionServices.js";

export const createSubmission = async (req, res) => {
  try {
    const { courseId, type, content, score } = req.body;

    const submission = await submissionService.createSubmissionService({
      userId: req.user._id,
      courseId,
      type,
      content,
      score,
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await submissionService.getAllSubmissionsService();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
