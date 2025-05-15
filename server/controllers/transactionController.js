import Transaction from "../models/transaction.js";

// Add new transaction
export const addTransaction = async (req, res) => {
  try {
    const { amount, category, type, date, description } = req.body;

    // Validation
    if (!amount || !category || !type) {
      return res.status(400).json({
        message: "Amount, category, and type are required",
      });
    }

    const newTransaction = new Transaction({
      userId: req.userId,
      amount: type === "expense" ? -Math.abs(amount) : Math.abs(amount),
      category,
      type,
      description: description || "",
      date: date ? new Date(date) : new Date(),
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Add transaction error:", error);
    res.status(500).json({
      message: "Failed to add transaction",
      error: error.message,
    });
  }
};

// Get all transactions for a user
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId }).sort({
      date: -1,
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Get transactions error:", error);
    res.status(500).json({
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Transaction ID is required" });
    }

    const transaction = await Transaction.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await transaction.deleteOne();
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Delete transaction error:", error);
    res.status(500).json({
      message: "Failed to delete transaction",
      error: error.message,
    });
  }
};

// Update transaction
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, type, date, description } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Transaction ID is required" });
    }

    const transaction = await Transaction.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Update the transaction
    transaction.amount =
      type === "expense" ? -Math.abs(amount) : Math.abs(amount);
    transaction.category = category;
    transaction.type = type;
    transaction.description = description || "";
    transaction.date = date ? new Date(date) : transaction.date;

    await transaction.save();

    res.status(200).json(transaction);
  } catch (error) {
    console.error("Update transaction error:", error);
    res.status(500).json({
      message: "Failed to update transaction",
      error: error.message,
    });
  }
};
