import mongoose, { Schema, model, models } from "mongoose";

const JobSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    employmentType: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = models.Job || model("Job", JobSchema);

export default Job;