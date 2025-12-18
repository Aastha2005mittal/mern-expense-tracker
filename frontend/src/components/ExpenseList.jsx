import React from "react";
import { deleteExpense } from "../utils/api";

const ExpenseList = ({ expenses = [], fetchExpenses }) => {
  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  return (
    <div>
      {expenses.map((exp) => (
        <div
          key={exp._id}
          className="flex justify-between border-b p-2"
        >
          <div>
            {exp.title} - ₹{exp.amount} ({exp.category})
          </div>
          <button
            onClick={() => handleDelete(exp._id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
