const sequelize = require('../db')
const Sequelize = require('sequelize')
const User = require('./userModel')

const Transaction = sequelize.define('transactions' ,{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    amount:{type:Sequelize.FLOAT},
    account:{type:Sequelize.STRING}, // the phone number om/momo
    reference:{type:Sequelize.STRING},
    status:{type:Sequelize.STRING, enum:['pending' ,'success' ,'failed']},
    date:{type:Sequelize.DATE},

})

module.exports = Transaction