// src/components/TransactionTable.jsx
import React from "react";
import { Link } from "react-router-dom";

const TransactionTable = ({ transactions, limit = 10 }) => {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Limit the number of transactions to display if needed
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions;
  const hasMoreTransactions = transactions.length > limit;

  return (
    <div>
      {transactions.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayTransactions.map((transaction) => (
                  <tr key={transaction._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full mr-2 ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm font-medium text-gray-900">
                          {transaction.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.note || '-'}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(Math.abs(parseFloat(transaction.amount)))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {hasMoreTransactions && limit && (
            <div className="text-center mt-4">
              <Link to="/transactions" className="text-blue-500 hover:text-blue-700 font-medium">
                View All ({transactions.length}) Transactions
              </Link>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500 py-4">No transactions found for the selected filters</p>
      )}
    </div>
  );
};

export default TransactionTable;