
import React from "react";

const TransactionSummary = ({ summary }) => {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <div className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-lg  border border-1 ">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-medium text-gray-600 mb-2 light:text-gray-800 dark:text-white">Income</h3>
          <p className="text-2xl font-bold text-green-500">{formatCurrency(summary.income)}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-lg border border-1">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Expenses</h3>
          <p className="text-2xl font-bold text-red-500">{formatCurrency(summary.expense)}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-lg  border border-1">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Net Worth</h3>
          <p className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
            {formatCurrency(summary.balance)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;