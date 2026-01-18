import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: helper functions for expenses
export const getExpenses = () => api.get("/expenses");
export const addExpense = (expense) => api.post("/expenses", expense);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);

// ✅ default export
export default api;
