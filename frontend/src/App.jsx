import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Dashboard from "./components/Dashboard";

function App() {
  const [expenses, setExpenses] = useState([]);

  // Fetch all expenses
const fetchExpenses = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/expenses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      // ❌ Unauthorized or error
      setExpenses([]);
      return;
    }

    const data = await res.json();

    // ✅ Ensure data is array
    if (Array.isArray(data)) {
      setExpenses(data);
    } else {
      setExpenses([]);
    }

  } catch (error) {
    console.error("Fetch error:", error);
    setExpenses([]);
  }
};

  // Load expenses on app start
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        MERN Expense Tracker
      </h1>

      {/* Add Expense */}
      <ExpenseForm fetchExpenses={fetchExpenses} />

      {/* Analytics */}
      <div className="my-6 max-w-md">
        <Dashboard expenses={expenses} />
      </div>

      {/* Expense List */}
      <ExpenseList
        expenses={expenses}
        fetchExpenses={fetchExpenses}
      />
    </div>
  );
}

export default App;
