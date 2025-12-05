import express from "express";
import {
  enrollStudent,
  getAllEnrollments,
  getMyCourses,
  updateProgress,
} from "../controller/enrollmentController.js";
import { admin } from "../middlewares/authMiddleware.js";
import { enrollmentSchema } from "../validation/schema.js";
import { validate } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/", validate(enrollmentSchema), enrollStudent);
router.get("/my-courses", getMyCourses);
router.post("/progress", updateProgress);

router.get("/", admin, getAllEnrollments);

export default router;
