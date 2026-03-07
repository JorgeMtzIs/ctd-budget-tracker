const Transaction = require("../models/Transaction");
const parseErr = require("../utils/parseValidationErrs");

const getTransactions = async (req, res) => {
  res.render("transactions", { expenses: null, incomes: null });
};

const createTransaction = async (req, res) => {
  res.send("create transactions");
};

const updateTransaction = async (req, res) => {
  res.send("update transactions");
};

const deleteTransaction = async (req, res) => {
  res.send("delete transactions");
};

const showNew = async (req, res) => {
  res.send("show new transactions");
};

const showUpdate = async (req, res) => {
  res.send("show update transactions");
};

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  showNew,
  showUpdate
};
