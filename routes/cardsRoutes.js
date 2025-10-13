const express = require("express");
const { createCard, cardTransaction, freeCard } = require("../controllers/cardControllers");
const router = express.Router();

router.post("/create", createCard);
router.post("/transactions", cardTransaction);
router.post("/freez", freeCard);

module.exports = router;