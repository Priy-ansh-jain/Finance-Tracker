import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const TransactionContext = createContext();

const API_URL = "http://localhost:5179/api/transactions";

export const TransactionProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all transactions
  const fetchTransactions = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(API_URL);
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  // Add a new transaction
  const addTransaction = async (transactionData) => {
    setLoading(true);
    setError(null);

    try {
      // Ensure note field is included even if empty
      const dataToSend = {
        ...transactionData,
        note: transactionData.note || ""
      };

      const res = await axios.post(API_URL, dataToSend);
      setTransactions(prev => [res.data, ...prev]);
      return res.data;
    } catch (err) {
      console.error("Error adding transaction:", err);
      setError("Failed to add transaction");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing transaction
  const updateTransaction = async (id, transactionData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.put(`${API_URL}/${id}`, transactionData);
      setTransactions(prev =>
        prev.map(transaction =>
          transaction._id === id ? res.data : transaction
        )
      );
      return res.data;
    } catch (err) {
      console.error("Error updating transaction:", err);
      setError("Failed to update transaction");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a transaction
  const deleteTransaction = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${API_URL}/${id}`);
      setTransactions(prev => prev.filter(transaction => transaction._id !== id));
    } catch (err) {
      console.error("Error deleting transaction:", err);
      setError("Failed to delete transaction");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Export transactions to CSV
  const exportTransactions = (startDate, endDate) => {
    let filteredTransactions = [...transactions];

    // Apply date filtering if provided
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // End of the day

      filteredTransactions = filteredTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= start && transactionDate <= end;
      });
    }

    // Convert to CSV format
    const headers = "Date,Type,Category,Note,Amount\n";
    const csvData = filteredTransactions.map(transaction => {
      const date = new Date(transaction.date).toLocaleDateString();
      const type = transaction.type;
      const category = transaction.category;
      const note = transaction.note || "";
      const amount = transaction.amount;

      return `${date},${type},${category},"${note}",${amount}`;
    }).join("\n");

    const csvContent = headers + csvData;

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Load transactions when the authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchTransactions();
    } else {
      setTransactions([]);
    }
  }, [isAuthenticated]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        error,
        fetchTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        exportTransactions
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
export default TransactionContext;

