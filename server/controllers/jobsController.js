import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  doesNotExistError,
  UnAuthenticated,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermission.js";
import mongoose from "mongoose";
import moment from "moment";

//Functionality to create a job
const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please Provide All Values");
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

//Functionality to get all the job
const getAllJobs = async (req, res) => {
  const { status, jobType, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  //add stuff based on condition
  //Querying on the search screen based on various conditions
  if (status && status !== "All") {
    queryObject.status = status;
  }

  if (jobType && jobType !== "All") {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  //No await
  
  let result = Job.find(queryObject);

  //chain sort condition
  //Sorting functionality
  if (sort === "Latest") {
    result = result.sort("-createdAt");
  }

  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  if (sort === "a-z") {
    result = result.sort("position");
  }

  if (sort === "z-a") {
    result = result.sort("-position");
  }

  //using the limit and skip from mongoose to limit the number of jobs displayed

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const jobs = await result;

  //to count the number of total jobs in all pages for a specific query search
  const totalJobs = await Job.countDocuments(queryObject);
  //to count the number of pages
  const numOfPages = Math.ceil(totalJobs / limit); //ceil to round up

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages: numOfPages });
};

const getCalJobs = async (req, res) => {
  const { status, jobType, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  //add stuff based on condition

  if (status && status !== "All") {
    queryObject.status = status;
  }

  if (jobType && jobType !== "All") {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  //No await
  
  let result = Job.find(queryObject);

  //chain sort condition

  if (sort === "Latest") {
    result = result.sort("-createdAt");
  }

  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  if (sort === "a-z") {
    result = result.sort("position");
  }

  if (sort === "z-a") {
    result = result.sort("-position");
  }

  //using the limit and skip from mongoose to limit the number of jobs displayed

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 100;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const jobs = await result;

  //to count the number of total jobs in all pages for a specific query search
  const totalJobs = await Job.countDocuments(queryObject);
  //to count the number of pages
  const numOfPages = Math.ceil(totalJobs / limit); //ceil to round up

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages: numOfPages });
};


////Functionality to update all the jobs
const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }

  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new doesNotExistError(`No job with id: ${jobId}`);
  }

  //check permissions

  checkPermissions(req.user, job.createdBy);

  const jobUpdate = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ jobUpdate });
};
  
//Functionality to delete a job
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new doesNotExistError(`No job found with id: ${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  await job.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Job Deleted" });
};

//using aggregation pipeline to show statistics of the Jobs - array of matches and groups
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    //match is used to filter all the jobs created by a certain user
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    //grouping them on based on job status and count of each group
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  //using reduce which returns an object of diff status title by iterrating over the array
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  //for a new user when there are no jobs added yet - setting up default stats object
  const defaultStats = {
    Awaiting: stats["Awaiting Response"] || 0,
    Interview: stats["Interview Scheduled"] || 0,
    Rejected: stats.Rejected || 0,
    Accepted: stats.Accepted || 0,
  };

  //default value for stats chart
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats, getCalJobs };
