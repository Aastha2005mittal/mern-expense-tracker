import Expense from "../models/Expense.js";

// GET
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    console.error("GET EXPENSES ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// POST
export const addExpense = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { title, amount, category } = req.body;

    if (!title || amount == null || !category) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const expense = await Expense.create({
      title,
      amount: Number(amount),
      category,
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error("ADD EXPENSE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
