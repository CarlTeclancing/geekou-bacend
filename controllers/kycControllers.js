const Kyc = require('../models/kycModel')
const User = require('../models/userModel')
const { createUserWithKyc, updateUser, checkUserValidity } = require('../services/swychr/userProvisioning')

const addKyc = async (req ,res) => {
    try{
        const {dob, mobile, mobile_code, gender, address, street, city, postal_code, country, country_iso_code, id_proof_type, id_proof_no, id_proof_expiry_date ,id_proof_url_list , livelyness_img} = req.body
        console.log(req.body);
        
        if(!dob || !mobile ||!mobile_code ||!gender ||!address || !street || !city || !postal_code || !country || !country_iso_code || !id_proof_type || !id_proof_no || !id_proof_expiry_date || !id_proof_url_list || !livelyness_img ){
            return res.status(400).json({error:'All fields required for kyc creation'})
        }
        
        const user = await User.findByPk(req.user)
        const response = await createUserWithKyc({...req.body, name:user.name, email:user.email})
        // console.log("the response OBJ of kyc creation: " ,response);
        const data = await response.json()
        console.log(data);
        // return
        if(response.ok){
            if(data.data){
                user.swychr_user_id = data.data.id
                await user.save()
                
                const tmp = await Kyc.create({...req.body ,userId:req.user})
                return res.status(201).json({kyc:tmp})
            }else{
                return res.status(400).json({error:data.message})
            }
        }else{
            return res.status(400).json({error:'Failed to save data'})
        }

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


const getKyc = async (req ,res) => {
    try{
        const {id} = req.params
        const kyc = await Kyc.findByPk(id)
        if(kyc){
            return res.status(200).json(kyc)
        }else{
            return res.status(404).json(kyc)
        }

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


const getAllKyc = async (req ,res) => {
    try{
        const kyc = await Kyc.findAll()
        if(kyc){
            return res.status(200).json(kyc)
        }else{
            return res.status(404).json(kyc)
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}

const checkKycValidity = async(req ,res)=>{
    try{
        const {user_id} = req.params
        const user = await User.findByPk(user_id)
        if(!user){return res.status(400).json({error:'Invalid user id'})}
        const response = await checkUserValidity({user_id:user.swychr_user_id})
        const data = await response.json()
        // return console.log(data);
        
        if(response.ok){
            // updating the user's kyc status
            // const kyc = await Kyc.findAll({where:{userId:user_id}})
            // kyc.active = true
            // kyc.status = 'success'
            return res.status(data.status).json(data)
        }else{
            return res.status(400).json({error:'Failed to execute operation'})
        }
    }
    catch(e){
        console.log(e.message);
        return res.status(500).json({error:'Server error'})
    }
}


const updateKyc = async (req ,res) => {
    try{
        const {id} = req.params
        const {dob, mobile, mobile_code, gender, address, street, city, postal_code, country, country_iso_code, id_proof_type, id_proof_no, id_expiry_date} = req.body

        const kyc = await Kyc.findByPk(id)
        const user = await User.findByPk(useLayoutEffect.userId)
        const respond = await updateUser({...req.body ,user_id:user.swychr_user_id})
            const data = await response.json()
        console.log(data);
        
        if(respond.ok){
            const response = await Kyc.update({...req.body} ,{where:{id:id}})
            return res.status(200).json(response)
        }else{
            return res.status(400).json(data)
        }
    
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}

const deleteKyc = async (req ,res) => {
    try{
        const {id} = req.params
        const tmp = await Kyc.destroy({where:{id:id}})
        return res.status(204).json({message:'data deleted successfully'})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


// file uploads controller
const uploadIdFront = async (req ,res) => {
    try{
        const tmp = await Kyc.find({where:{userId:req.user}})
        console.log(req.file)
        tmp.idCardFront = req.file.filename
        return res.status(200).json({message:'File uploaded successfully'})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}
const uploadIdBack = async (req ,res) => {
    try{
        const tmp = await Kyc.find({where:{userId:req.user}})
        console.log(req.file)
        tmp.idCardBack = req.file.filename
        return res.status(200).json({message:'File uploaded successfully'})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}
const uploadPicture = async (req ,res) => {
    try{
        const tmp = await Kyc.find({where:{userId:req.user}})
        console.log(req.file)
        tmp.picture= req.file.filename
        return res.status(200).json({message:'File uploaded successfully'})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}
const uploadNIU = async (req ,res) => {
    try{
        const tmp = await Kyc.find({where:{userId:req.user}})
        console.log(req.file)
        tmp.niu = req.file.filename
        return res.status(200).json({message:'File uploaded successfully'})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}



module.exports = {addKyc, getAllKyc ,getKyc ,deleteKyc ,updateKyc ,uploadIdBack ,uploadIdFront, uploadNIU, uploadPicture, checkKycValidity}