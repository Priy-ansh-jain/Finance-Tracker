// src/pages/Transactions/TransactionsPage.jsx
import React, { useContext, useState } from "react";
import TransactionContext from "../context/TransactionContext";

const TransactionsPage = () => {
  const { transactions, addTransaction, deleteTransaction, loading } = useContext(TransactionContext);
  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
    date: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(form.amount);
    if (!amt || !form.category || !form.type) return alert("Fill required fields");
    addTransaction({ ...form, amount: amt });
    setForm({ amount: "", category: "", type: "expense", date: "", note: "" });
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Transactions</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white p-6 rounded-xl shadow-lg border-[#b773df] border-y-2">
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="note"
          placeholder="Note (optional)"
          value={form.note}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 md:col-span-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold px-6 py-2 rounded hover:bg-blue-600 transition transform hover:scale-105 duration-200 md:col-span-2"
        >
          Add Transaction
        </button>
      </form>

      <ul className="space-y-4">
        {transactions.map((t) => (
          <li
            key={t._id}
            className={`flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-[1.02] border-l-4 ${t.type === "income" ? "border-green-500" : "border-red-500"}`}
          >
            <div>
              <h3 className="font-semibold text-lg">{t.category}</h3>
              <p className="text-sm text-gray-600">
                {new Date(t.date).toLocaleDateString()} | {t.note || "No note"}
              </p>
            </div>
            <div className="text-right">
              <p className={`font-bold text-xl ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
                {t.type === "income" ? "+" : "-"}${t.amount}
              </p>
              <button
                onClick={() => deleteTransaction(t._id)}
                className="text-sm text-red-500 hover:text-red-700 mt-1 underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsPage;

