const express = require("express");
const { createCard, cardTransaction, freeCard, getCard, getUserCard, rechargeCard, withdraw } = require("../controllers/cardControllers");
const router = express.Router();

router.post("/create", createCard);
router.post("/recharge-card", rechargeCard)
router.post("/withdraw-funds", withdraw)
router.get("/user/:user_id", getUserCard)

router.get("/:id", getCard)


module.exports = router;