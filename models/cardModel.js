const sequelize = require('../db')
const Sequelize = require('sequelize')
const User = require('./userModel')

const Card = sequelize.define('cards' ,{
    id:{
        type:Sequelize.INTEGER,
        preimaryKey:true,
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

})

module.exports = Card