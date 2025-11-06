const sequelize = require('../db')
const Sequelize = require('sequelize')
const User = require('./userModel')

const Transaction = sequelize.define('transactions' ,{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    userId:{
        type:Sequelize.INTEGER,
        references:{
            model:User,
            key:'id'
        }
    },
    amount:{type:Sequelize.FLOAT},
    account:{type:Sequelize.STRING}, // the phone number om/momo
    reference:{type:Sequelize.STRING},
    status:{type:Sequelize.STRING, enum:['pending' ,'success' ,'failed'] ,default:'pending'},
    date:{type:Sequelize.DATE},
    type:{type:Sequelize.STRING, enum:['deposit', 'withdrawal' ,'fee','creation']}

})

module.exports = Transaction