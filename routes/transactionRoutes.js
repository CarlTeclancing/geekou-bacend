const express = require("express");
const { addTransaction, getAllTransaction, getTransaction, deleteTransaction } = require("../controllers/transactionController");
const router = express.Router();

router.route("/")
.post(addTransaction)
.get(getAllTransaction)

router.route("/:id")
.get(getTransaction)
.delete(deleteTransaction)


module.exports = router;