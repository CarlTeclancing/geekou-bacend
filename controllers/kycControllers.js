const Kyc = require('../models/kycModel')

const addKyc = async (req ,res) => {
    try{
        const {} = req.body
        
        
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


const getKyc = async (req ,res) => {
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}



const getAllKyc = async (req ,res) => {
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


const updateKyc = async (req ,res) => {
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}

const deleteKyc = async (req ,res) => {
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


module.exports = {addKyc, getAllKyc ,getKyc ,deleteKyc ,updateKyc}