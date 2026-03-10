const Transaction = require("../models/Transaction");
const parseVErr = require("../utils/parseValidationErrs");

const getTransactions = async (req, res) => {
  const expenses = await Transaction.find({
    createdBy: req.user._id,
    kind: "expense"
  }).sort("createdAt");
  const incomes = await Transaction.find({
    createdBy: req.user._id,
    kind: "income"
  }).sort("createdAt");
  res.render("transactions", { expenses, incomes });
};

const createTransaction = async (req, res) => {
  try {
    req.body.date = Date(req.body.date);
    req.body.createdBy = req.user._id;
    await Transaction.create(req.body);
  } catch (e) {
    if (e.constructor.name === "ValidationError") {
      parseVErr(e, req);
    } else {
      throw e;
    }
    return res.render("transaction", {
      transaction: null,
      errors: req.flash("error")
    });
  }
  res.redirect("/transactions");
};

const updateTransaction = async (req, res) => {
  req.body.date = Date(req.body.date);
  if (!req.body.recurring) {
    req.body.recurring = false;
  }
  const transaction = await Transaction.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    req.body,
    { returnDocument: "after", runValidators: true }
  );
  if (!transaction) {
    req.flash("error", `No transaction with id ${req.params.id} found`);
    return res.render("index", { errors: req.flash("error") });
  }
  res.redirect("/transactions");
};

const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.id
  });
  if (!transaction) {
    req.flash("error", `No transaction with id ${req.params.id} found`);
    return res.render("index", { errors: req.flash("error") });
  }
  res.redirect("/transactions");
};

const showNew = async (req, res) => {
  res.render("transaction", { transaction: null });
};

const showUpdate = async (req, res) => {
  const transaction = await Transaction.findOne({
    _id: req.params.id,
    createdBy: req.user.id
  });
  if (!transaction) {
    req.flash("error", `No transaction with id ${req.params.id} found`);
    return res.render("index", { errors: req.flash("error") });
  }
  const formattedTransaction = transaction.toObject();
  formattedTransaction.date = formattedTransaction.date
    .toISOString()
    .split("T")[0];
  res.render("transaction", { transaction: formattedTransaction });
};

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  showNew,
  showUpdate
};
