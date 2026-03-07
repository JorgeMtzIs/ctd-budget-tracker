const express = require("express");
const router = express.Router();

const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  showNew,
  showUpdate
} = require("../controllers/transactions");

router.route("/").get(getTransactions).post(createTransaction);
router.route("/new").get(showNew);
router.route("/edit/:id").get(showUpdate);
router.route("/update/:id").post(updateTransaction);
router.route("/delete/:id").post(deleteTransaction);

module.exports = router;
