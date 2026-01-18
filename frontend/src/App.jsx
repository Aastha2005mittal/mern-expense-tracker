import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch all expenses
  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setExpenses([]);
        return;
      }

      const data = await res.json();
      setExpenses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
      setExpenses([]);
    }
  };

  useEffect(() => {
    if (token) fetchExpenses();
  }, [token]);

  // Protected Route Wrapper
  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Protected Dashboard */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold text-indigo-600 mb-6">
                 Expense Tracker
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
            </PrivateRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
