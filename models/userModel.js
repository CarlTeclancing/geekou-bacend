const sequelize = require('../db')
const Sequelize = require('sequelize')

const User = sequelize.define('users' ,{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{type:Sequelize.STRING},
    email:{type:Sequelize.STRING ,unique:true},
    password:{type:Sequelize.STRING},
    token:{type:Sequelize.TEXT}
})

module.exports = User