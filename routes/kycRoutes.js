const express = require("express");
const { submitKYC, updateKYC, DeleteKYC } = require("../controllers/kycControllers");
const router = express.Router();

router.post("/create", ()=>{});
router.post("/update", ()=>{});
router.post("/delete", ()=>{});

module.exports = router;