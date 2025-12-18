import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ expenses }) => {
  // ✅ Safety check
  if (!Array.isArray(expenses) || expenses.length === 0) {
    return <p className="text-gray-500">No expenses to show</p>;
  }

  const categories = [...new Set(expenses.map(e => e.category))];

  const data = {
    labels: categories,
    datasets: [
      {
        data: categories.map(cat =>
          expenses
            .filter(e => e.category === cat)
            .reduce((sum, e) => sum + Number(e.amount), 0)
        ),
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default Dashboard;

