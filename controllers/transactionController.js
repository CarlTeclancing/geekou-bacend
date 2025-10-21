const Transaction = require('../models/transactionModel')

const addTransaction = async (req ,res) => {
    try{
        const {amount ,account, date} = req.body
        if(!amount || !account || !date){
            return res.status(400).json({error:'All fields required'})
        }
        const respond = await Transaction.create(...req.body)
        return res.status(200).json({message:'transaction save successfully'})
        
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


const getTransaction = async (req ,res) => {
    try{
        const {id} = req.params
        const tran = await Transaction.findByPk(id)
        return res.status(200).json(tran)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}



const getAllTransaction = async (req ,res) => {
    try{
        const trans = await Transaction.findAll(id)
        return res.status(200).json(trans)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}



const deleteTransaction = async (req ,res) => {
    try{
        const {id} = req.params
        const respond = await Transaction.destroy({where:{id:id}})
        return res.status(200).json({message:'Transaction deleted'})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


module.exports = {addTransaction, getAllTransaction ,getTransaction ,deleteTransaction}