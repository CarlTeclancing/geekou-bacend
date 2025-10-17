const Profile = require('../models/profileModel')

const addProfile = async (req ,res) => {
    try{
        const {} = req.body
        
        
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


const getProfile = async (req ,res) => {
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}



const getAllProfile = async (req ,res) => {
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


const updateProfile = async (req ,res) => {
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}

const deleteProfile = async (req ,res) => {
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


module.exports = {addProfile, getAllProfile ,getProfile ,deleteProfile ,updateProfile}