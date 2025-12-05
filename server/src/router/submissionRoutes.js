import express from "express";
import {
  createSubmission,
  getAllSubmissions,
} from "../controller/submissionController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import { submissionSchema } from "../validation/schema.js";
import { validate } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/", protect, validate(submissionSchema), createSubmission);
router.get("/", protect, admin, getAllSubmissions);

export default router;
