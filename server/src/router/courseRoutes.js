import express from "express";
import {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controller/courseController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import { courseSchema } from "../validation/schema.js";
import { validate } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);

router.post("/", protect, admin, validate(courseSchema), createCourse);
router.put("/:id", protect, admin, validate(courseSchema), updateCourse);
router.delete("/:id", protect, admin, deleteCourse);

export default router;
