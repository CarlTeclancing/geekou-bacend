const express = require('express')
const { addProfile, getAllProfile, getProfile, updateProfile, deleteProfile } = require('../controllers/profileController')
const router = express.Router()


router.route("/")
.post(addProfile)
.get(getAllProfile)

router.route("/:id")
.get(getProfile)
.put(updateProfile)
.delete(deleteProfile)

module.exports = router