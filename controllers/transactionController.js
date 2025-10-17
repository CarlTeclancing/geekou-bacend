const Transaction = require('../models/transactionModel')

const addTransaction = async (req ,res) => {
    try{
        const {} = req.body
        
        
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


const getTransaction = async (req ,res) => {
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}



const getAllTransaction = async (req ,res) => {
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


const updateTransaction = async (req ,res) => {
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}

const deleteTransaction = async (req ,res) => {
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


module.exports = {addTransaction, getAllTransaction ,getTransaction ,deleteTransaction ,updateTransaction}