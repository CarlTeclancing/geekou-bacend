const express = require("express");
const { submitKYC, updateKYC, DeleteKYC } = require("../controllers/kycControllers");
const router = express.Router();

router.post("/create", submitKYC);
router.post("/update", updateKYC);
router.post("/delete", DeleteKYC);

module.exports = router;