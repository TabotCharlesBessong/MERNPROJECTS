import express from "express";
import {
  createJob,
  getJobs,
  getJobsByUser,
  searchJobs,
  applyJob,
  likeJob,
  getJobById,
  deleteJob,
} from "../controllers/job.controller.js";
import protect from "../middleware/protect.js";

const jobRouter = express.Router();

jobRouter.post("/", protect, createJob);
jobRouter.get("/", getJobs);
jobRouter.get("/user/:id", protect, getJobsByUser);

// search jobs
jobRouter.get("/search", searchJobs);

// apply for job
jobRouter.put("/apply/:id", protect, applyJob);

// like job and unlike job
jobRouter.put("/like/:id", protect, likeJob);

// getJobById
jobRouter.get("/:id", protect, getJobById);

// delete job
jobRouter.delete("/:id", protect, deleteJob);

export default jobRouter;
