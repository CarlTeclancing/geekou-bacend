const Card = require('../models/CardModel')

const createCard = async (req ,res) => {
    try{
        const {} = req.body
        
        
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


const getCard = async (req ,res) => {
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}



const getAllCard = async (req ,res) => {
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


const updateCard = async (req ,res) => {
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}

const deleteCard = async (req ,res) => {
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


module.exports = {createCard, getAllCard ,getCard ,deleteCard ,updateCard}