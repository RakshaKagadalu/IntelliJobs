import express from "express";
const router = express.Router();

import {
  createJob,
  deleteJob,
  getAllJobs,
  getCalJobs,
  updateJob,
  showStats,
} from "../controllers/jobsController.js";

router.route("/").post(createJob).get(getAllJobs);
router.route("/cal").get(getCalJobs);
router.route("/stats").get(showStats).get(showStats);
router.route("/:id").delete(deleteJob).put(updateJob);

export default router;
