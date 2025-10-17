const Kyc = require('../models/kycModel')

const addKyc = async (req ,res) => {
    try{
        const {fullname ,dob, location ,idNumber ,phoneNumber} = req.body
        if(!fullname || !dob || !location || !idNumber || !phoneNumber){
            return res.status(401).json({error:"All fields required"})
        }

        // for files
        // console.log(req.files);
        

        // if(phoneNumber[0] != 6 || phoneNumber.length != 9){return res.status(401).json({error:'invalid phone number'})}
        const tmp = await Kyc.create({...req.body ,userId:req.user})
        return res.status(201).json({kyc:tmp})

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


const updateKyc = async (req ,res) => {
    try{
        const {id} = req.params
        const {fullname ,dob, location ,idNumber ,phoneNumber} = req.body
        if(!fullname || !dob || !location || !idNumber || !phoneNumber){
            return res.status(401).json({error:"All fields required"})
        }
        const response = await Kyc.update({...req.body} ,{where:{id:id}})
        return res.status(200).json(response)
    
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


module.exports = {addKyc, getAllKyc ,getKyc ,deleteKyc ,updateKyc}