const express = require("express");
const { createCard, cardTransaction, freeCard } = require("../controllers/cardControllers");
const router = express.Router();

router.post("/create", ()=>{});
router.post("/transactions", ()=>{});
router.post("/freez", ()=>{});

module.exports = router;