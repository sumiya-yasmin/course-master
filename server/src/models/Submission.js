import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    type: {
      type: String,
      enum: ["assignment", "quiz"],
      required: true,
    },
    content: { type: String },
    score: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);
