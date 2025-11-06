const express = require("express");
const multer = require('multer')
const path = require('path')
const {cwd} = require('process')
const { addKyc, getAllKyc, getKyc, updateKyc, deleteKyc, uploadPicture, uploadIdFront, uploadIdBack, checkKycValidity, uploadPassport, submitKyc } = require("../controllers/kycControllers");
const { mkdir, existsSync, mkdirSync } = require("fs");
const router = express.Router();

const storage = multer.diskStorage({
    destination:async(req ,file ,cb)=>{
        console.log('the user id', req.user);
        const file_dir = path.join(cwd(), 'uploads', req.user+"")
        console.log("does file path exists: ",existsSync(file_dir));
        
        if(!existsSync(file_dir)){
            await mkdirSync(file_dir, {recursive:true})
            console.log("the created directory" ,file_dir);
        }
        return cb(null, file_dir)
    },
    filename:(req ,file, cb)=>{
        let random = Math.floor( (Math.random() *9)+1 )
        let name = random+file.originalname
        return cb(null, name)
    }
})

const uploads = multer({storage})

router.route("/save").post(addKyc)
router.route("/submit").get(submitKyc)

router.route("/").get(getAllKyc)
router.get("/check-kyc-status/:user_id", checkKycValidity)

// Files upload
router.post("/upload-picture", uploads.single('file') ,uploadPicture)
router.post("/upload-nid-front", uploads.single('file') ,uploadIdFront)
router.post("/upload-nid-back", uploads.single('file') ,uploadIdBack)
router.post("/upload-passport", uploads.single('file'), uploadPassport)


router.route("/:id")
.get(getKyc)
.put(updateKyc)
.delete(deleteKyc)

module.exports = router;