const sequelize = require('../db')
const Sequelize = require('sequelize')
const User = require('./userModel')

const Card = sequelize.define('cards' ,{
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
    balance:{type:Sequelize.FLOAT},
    card_type:{type:Sequelize.STRING},
    swychr_card_id:{type:Sequelize.STRING}

})

module.exports = Card