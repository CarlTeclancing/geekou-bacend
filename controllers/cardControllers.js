const Card = require('../models/cardModel');
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const { purchaseVirtualCard, getVirtualCardDetails, getUserVirtualCard, rechargeVirtualCard, withdrawFunds } = require('../services/swychr/cardProvisioning');

const createCard = async (req ,res) => {
    try{
        const {card_type, amount=0} = req.body
        if( !card_type ){
            return res.status(400).json({error:'All fields required'})
        }

        const user = User.findByPk(req.user)
        const response = await purchaseVirtualCard({...req.body, user_id:user.swychr_user_id})
        const data = await response.json()
        console.log(data);
        
        if(data.status == 200){
            const card = await Card.create({userId:req.user, balance:amount, card_type, swychr_card_id:data.card_id})
            return res.status(200).json(card)
        }else{
            return res.status(data.status).json({error:data.message})
        }
        
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


const getCard = async (req ,res) => {
    try{
        const {id} = req.params
        const card = await Card.findByPk(id)
        const response = await getVirtualCardDetails({card_id:card.swychr_card_id})
        const data = await response.json()
        return console.log(data);

        return res.status(200).json(data)
        
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}

const getUserCard = async (req ,res) => {
    try{
        const {user_id} = req.params
        const user = await User.findByPk(user_id)
        const response = await getUserVirtualCard({user_id:user.swychr_user_id})
        const data = await response.json()
        return console.log(data);

        return res.status(200).json(data)
        
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}

const rechargeCard = async (req ,res) => {
    try{
        const {id, amount} = req.params
        const card = await Card.findByPk(id)
        const response = await rechargeVirtualCard({card_id:card.swychr_card_id ,amount})
        const data = await response.json()
        return console.log(data);
        if(response.ok){
            await Transaction.create({userId:req.user, amount, date:Date.now(), type:'deposit'})
            return res.status(200).json(data)
        }else{
            return res.status(400).json({error:'Operation failed'})
        }
        
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:'Server error'})
    }
}


const withdraw = async (req ,res) => {
    try{
        const {id, amount} = req.params
        const card = await Card.findByPk(id)
        const response = await withdrawFunds({card_id:card.swychr_card_id ,amount})
        const data = await response.json()
        return console.log(data);
        if(response.ok){
            await Transaction.create({userId:req.user, amount, date:Date.now(), type:'withdrawal'})
            return res.status(200).json(data)
        }else{
            return res.status(400).json({error:'Operation failed'})
        }
        
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


module.exports = {createCard, getAllCard ,getCard ,deleteCard ,updateCard ,getUserCard ,rechargeCard, withdraw}