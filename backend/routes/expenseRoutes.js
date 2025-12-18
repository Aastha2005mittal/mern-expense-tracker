import express from "express";
import {
  addExpense,
  getExpenses,
  deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

// DEV MODE (no auth)
router.get("/", getExpenses);
router.post("/", addExpense);
router.delete("/:id", deleteExpense);

export default router;
