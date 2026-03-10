const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  kind: {
    type: String,
    enum: ["income", "expense"],
    default: "expense"
  },
  amount: {
    type: Number,
    required: [true, "Please provide an amount"]
  },
  date: {
    type: Date,
    required: [true, "Please provide a date"]
  },
  recurring: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    maxLength: 2000
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"]
  }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
