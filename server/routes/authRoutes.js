import express from "express";
const router = express.Router();

import rateLimiter from 'express-rate-limit'
const apiLimiter = rateLimiter({
  windowMs: 15*60*1000, //15 minutes
  max: 10,
  message: "Too many request from this IP address, please try again after 15 minutes"
})


import {
  updateUser,
  registerUser,
  loginUser,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

router.route("/register").post(apiLimiter, registerUser);
router.route("/login").post(apiLimiter, loginUser);
router.route("/updateUser").put(authenticateUser, updateUser);

export default router;
