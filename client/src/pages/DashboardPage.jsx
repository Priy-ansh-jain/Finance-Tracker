

import React, { useContext, useState, useMemo } from "react";
import TransactionContext from "../context/TransactionContext";
import TransactionSummary from "../components/dashboard/TransactionSummary"
import MonthlyChart from "../components/dashboard/MonthlyChart";
import CategoryBreakdownChart from "../components/dashboard/CategoryBreakdown";
import TransactionTable from "../components/dashboard/TransactionalTable";
import FilterPanel from "../components/transaction/TransactionFilter";

// Register ChartJS components
// No longer needed as it's handled in the individual chart components

const DashboardPage = () => {
  const { transactions, loading } = useContext(TransactionContext);
  const [dateFilter, setDateFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Get all unique categories from transactions
  const categories = useMemo(() => {
    const uniqueCategories = new Set();
    transactions.forEach(transaction => {
      uniqueCategories.add(transaction.category);
    });
    return ["all", ...Array.from(uniqueCategories)];
  }, [transactions]);

  // Filter transactions based on date and category
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Apply date filter
    if (dateFilter === "custom" && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // End of day

      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= start && transactionDate <= end;
      });
    } else if (dateFilter === "month") {
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear
        );
      });
    } else if (dateFilter === "year") {
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getFullYear() === currentYear;
      });
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(transaction => transaction.category === categoryFilter);
    }

    return filtered;
  }, [transactions, dateFilter, startDate, endDate, categoryFilter, currentMonth, currentYear]);

  // Calculate summaries
  const summary = useMemo(() => {
    const income = filteredTransactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0);

    const expense = filteredTransactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0);

    return {
      income,
      expense,
      balance: income - expense
    };
  }, [filteredTransactions]);

  // Prepare monthly data for the chart
  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyIncome = Array(12).fill(0);
    const monthlyExpense = Array(12).fill(0);

    // Filter transactions from the current year
    const yearTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getFullYear() === currentYear;
    });

    // Sum up income and expenses by month
    yearTransactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const month = transactionDate.getMonth();
      const amount = Math.abs(parseFloat(transaction.amount));

      if (transaction.type === "income") {
        monthlyIncome[month] += amount;
      } else {
        monthlyExpense[month] += amount;
      }
    });

    return {
      labels: months,
      incomeData: monthlyIncome,
      expenseData: monthlyExpense
    };
  }, [transactions, currentYear]);

  // Prepare expense breakdown by category
  const expensesByCategory = useMemo(() => {
    const categoryMap = {};

    filteredTransactions
      .filter(t => t.type === "expense")
      .forEach(transaction => {
        const category = transaction.category;
        const amount = Math.abs(parseFloat(transaction.amount));

        if (categoryMap[category]) {
          categoryMap[category] += amount;
        } else {
          categoryMap[category] = amount;
        }
      });

    return categoryMap;
  }, [filteredTransactions]);

  // Chart data for the monthly trend
  const lineChartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Income',
        data: monthlyData.incomeData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Expenses',
        data: monthlyData.expenseData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: `Monthly Trends - ${currentYear}`,
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => formatCurrency(value)
        }
      }
    }
  };

  // Pie chart data for category breakdown
  const pieChartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        label: 'Expenses',
        data: Object.values(expensesByCategory),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(199, 199, 199, 0.7)',
          'rgba(83, 102, 255, 0.7)',
          'rgba(78, 129, 189, 0.7)',
          'rgba(129, 78, 189, 0.7)',
        ],
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Expense Breakdown by Category',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${formatCurrency(value)}`;
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Financial Dashboard</h1>

      {/* Filters */}
      <FilterPanel
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />

      {/* Financial Summary */}
      <div className="mb-6 ">
        <TransactionSummary summary={summary} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Trend Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <MonthlyChart
            monthlyData={monthlyData}
            year={currentYear}
          />
        </div>

        {/* Category Breakdown Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <CategoryBreakdownChart
            expensesByCategory={expensesByCategory}
          />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="font-semibold text-lg mb-3">Recent Transactions</h2>
        <TransactionTable
          transactions={filteredTransactions}
          limit={10}
        />
      </div>
    </div>
  );
};

export default DashboardPage;