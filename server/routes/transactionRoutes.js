import express from "express";
import {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transactionController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

// Protected routes
router.post("/", verifyToken, addTransaction);
router.get("/", verifyToken, getTransactions);
router.delete("/:id", verifyToken, deleteTransaction);
router.put("/:id", verifyToken, updateTransaction);

export default router;
