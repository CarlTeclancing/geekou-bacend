const Kyc = require('../models/kycModel')
const User = require('../models/userModel')
const { createUserWithKyc, updateUser, checkUserValidity } = require('../services/swychr/userProvisioning')

const addKyc = async (req ,res) => {
    try{
        const {dob, mobile, mobile_code, gender, address, street, city, postal_code, country, country_iso_code, id_proof_type, id_proof_no, id_proof_expiry_date} = req.body
        console.log(req.body);
        
        if(!dob || !mobile ||!mobile_code ||!gender ||!address || !street || !city || !postal_code || !country || !country_iso_code || !id_proof_type || !id_proof_no || !id_proof_expiry_date ){
            return res.status(400).json({error:'All fields required for kyc creation'})
        }
        
        // const user = await User.findByPk(req.user)
        // return console.log(user);
        
        const tmp = await Kyc.create({...req.body ,userId:req.user})
        return res.status(200).json({message:'profile saved', kyc:tmp})

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}

const submitKyc = async(req, res) =>{
    try{
        console.log("the submitting user: " ,req.user);
        
        const kyc = await Kyc.findOne({where:{userId:req.user}})
        const user = await User.findByPk(req.user)
        if((kyc == null || !kyc) && (user == null || !user ) ){
            return res.status(400).json({error:'Invalid user'})
        }
            
        const response = await createUserWithKyc({...req.body, name:user.name, email:user.email})
        // console.log("the response OBJ of kyc creation: " ,response);
        const data = await response.json()
        console.log(data);
        // return
        if(response.ok){
            if(data.data){
                user.swychr_user_id = data.data.id
                await user.save()
                
                return res.status(201).json({message:'Submission successful'})
            }else{
                return res.status(400).json({error:data.message})
            }
        }else{
            return res.status(400).json({error:'Failed to save data'})
        }

    }catch(e){
        console.log();
        return res.status(500).json({error:'Server error'})
    }
}


const getKyc = async (req ,res) => {
    try{
        const {id} = req.params
        
        const kyc = await Kyc.findByPk(id)
        console.log(kyc);
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
        const tmp = await Kyc.findOne({where:{userId:req.user}})
        
        if(tmp == null || !tmp ){  return res.status(404).json({error:'No profile'}) }
        if(req.file == undefined || !req.file){ return res.status(404).json({error:'No file provided'}) }

        tmp.id_proof_front = req.file.filename
        
        if(tmp.id_proof_url_list){
            let prev = await JSON.parse(tmp.id_proof_url_list)
            prev.push( '/file/'+req.file.filename )
            tmp.id_proof_url_list = await JSON.stringify(prev)
        }else{
            let file = [ '/file/'+req.file.filename]
            tmp.id_proof_url_list = await JSON.stringify(file)
        }
        await tmp.save()
        return res.status(200).json({message:'Id-front uploaded successfully'})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}
const uploadIdBack = async (req ,res) => {
    try{
        const tmp = await Kyc.findOne({where:{userId:req.user}})
        if(tmp == null || !tmp ){  return res.status(404).json({error:'No profile'}) }
        if(req.file == undefined || !req.file){ return res.status(404).json({error:'No file provided'}) }

        tmp.id_proof_back = req.file.filename

        if(tmp.id_proof_url_list){
            let prev = await JSON.parse(tmp.id_proof_url_list)
            prev.push( '/file/'+req.file.filename )
            tmp.id_proof_url_list = await JSON.stringify(prev)
        }else{
            let file = [ '/file/'+req.file.filename]
            tmp.id_proof_url_list = await JSON.stringify(file)
        }
        await tmp.save()
        return res.status(200).json({message:'Id-back uploaded successfully'})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}
const uploadPicture = async (req ,res) => {
    try{
        const tmp = await Kyc.findOne({where:{userId:req.user}})
        if(tmp == null || !tmp ){  return res.status(404).json({error:'No profile'}) }
        if(req.file == undefined || !req.file){ return res.status(404).json({error:'No file provided'}) }

        tmp.picture = req.file.filename
        tmp.livelyness_img = "http://geekou.com/file/"+req.file.filename

        if(tmp.id_proof_url_list){
            let prev = await JSON.parse(tmp.id_proof_url_list)
            prev.push( '/file/'+req.file.filename )
            tmp.id_proof_url_list = await JSON.stringify(prev)
        }else{
            let file = [ '/file/'+req.file.filename]
            tmp.id_proof_url_list = await JSON.stringify(file)
        }
        await tmp.save()
        return res.status(200).json({message:'Picture uploaded successfully'})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}
const uploadPassport = async (req ,res) => {
    try{
        const tmp = await Kyc.findOne({where:{userId:req.user}})
        if(tmp == null || !tmp ){  return res.status(404).json({error:'No profile'}) }
        if(req.file == undefined || !req.file){ return res.status(404).json({error:'No file provided'}) }
        tmp.passport_img = req.file.filename

        if(tmp.id_proof_url_list){
            let prev = await JSON.parse(tmp.id_proof_url_list)
            prev.push( '/file/'+req.file.filename )
            tmp.id_proof_url_list = await JSON.stringify(prev)
        }else{
            let file = [ '/file/'+req.file.filename]
            tmp.id_proof_url_list = await JSON.stringify(file)
        }
        await tmp.save()
        return res.status(200).json({message:'Passport uploaded successfully'})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}



module.exports = {addKyc,submitKyc,  getAllKyc ,getKyc ,deleteKyc ,updateKyc ,uploadIdBack ,uploadIdFront, uploadPassport, uploadPicture, checkKycValidity}