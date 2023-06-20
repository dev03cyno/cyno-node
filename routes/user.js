import express from "express";
import { changePassword, login, signup } from "../controllers/user.js";
const router = express.Router()

router.post("/signup",signup)  // http://localhost:5000/api/v1/user/signup
router.post("/login",login)  // http://localhost:5000/api/v1/user/login
router.post("/change-password",changePassword)  // http://localhost:5000/api/v1/user/changePassword

export default router;