import express from "express";
import {
  signup,
  login,
  logout,
  getUserProfile,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", verifyToken, getUserProfile);

export default router;
