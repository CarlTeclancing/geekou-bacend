const express = require("express");
const { addKyc, getAllKyc, getKyc, updateKyc, deleteKyc } = require("../controllers/kycControllers");
const router = express.Router();

router.route("/submit").post(addKyc)
router.route("/").get(getAllKyc)

router.route("/:id")
.get(getKyc)
.put(updateKyc)
.delete(deleteKyc)

module.exports = router;