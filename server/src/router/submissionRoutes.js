import express from "express";
import {
  createSubmission,
  getAllSubmissions,
} from "../controller/submissionController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createSubmission);
router.get("/", protect, admin, getAllSubmissions);

export default router;
