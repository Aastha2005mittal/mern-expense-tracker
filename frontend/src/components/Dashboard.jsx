import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ expenses }) => {
  if (!Array.isArray(expenses) || expenses.length === 0) {
    return <p className="text-gray-500">No expenses to show</p>;
  }

  const categories = [...new Set(expenses.map(e => e.category))];

  // 🎨 Color palette
  const colors = [
    "#FF6384", // pink
    "#36A2EB", // blue
    "#FFCE56", // yellow
    "#4BC0C0", // teal
    "#9966FF", // purple
    "#FF9F40", // orange
    "#2ECC71", // green
    "#E74C3C", // red
  ];

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: categories.map(cat =>
          expenses
            .filter(e => e.category === cat)
            .reduce((sum, e) => sum + Number(e.amount), 0)
        ),
        backgroundColor: categories.map(
          (_, i) => colors[i % colors.length]
        ),
        hoverBackgroundColor: categories.map(
          (_, i) => colors[i % colors.length] + "CC"
        ),
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151", // Tailwind gray-700
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return ` ₹${context.parsed}`;
          },
        },
      },
    },
    cutout: "60%", // makes the donut thinner & prettier
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg w-96 mx-auto">
      <h2 className="text-center text-lg font-semibold mb-3 text-gray-700">
        Expense Breakdown
      </h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default Dashboard;
