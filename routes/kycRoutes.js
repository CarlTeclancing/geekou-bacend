const express = require("express");
const multer = require('multer')
const path = require('path')
const {cwd} = require('process')
const { addKyc, getAllKyc, getKyc, updateKyc, deleteKyc, uploadPicture, uploadIdFront, uploadIdBack, uploadNIU } = require("../controllers/kycControllers");
const router = express.Router();

const storage = multer.diskStorage({
    destination:(req ,file ,cb)=>{
        const dest = path.join(cwd() ,'uploads')
        return cb(null, dest)
    },
    filename:(req ,file, cd)=>{
        let random = (Math.random() *9)+1
        let name = random+file.originalname
        return cb(null, name)
    }
})

const uploads = multer({storage})

router.route("/submit").post(addKyc)
router.route("/").get(getAllKyc)

// Files upload
router.route("/upload-picture", uploads.single('file') ,uploadPicture)
router.route("/upload-nid-front", uploads.single('file') ,uploadIdFront)
router.route("/upload-nid-back", uploads.single('file') ,uploadIdBack)
router.route("/upload-niu", uploads.single('file'), uploadNIU)


router.route("/:id")
.get(getKyc)
.put(updateKyc)
.delete(deleteKyc)

module.exports = router;