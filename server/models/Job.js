import mongoose from "mongoose";
//Setting up the schema for the application
const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: [
        "Interview Scheduled",
        "Rejected",
        "Awaiting Response",
        "Accepted",
        
      ],
      default: "Awaiting Response",
    },

    jobType: {
      type: String,
      enum: ["Full-Time", "Internship", "Hybrid", "Remote"],
      default: "Full-Time",
    },
    jobLocation: {
      type: String,
      default: "my",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    dateOfInterview: {
      type: Date,
      default: null,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
