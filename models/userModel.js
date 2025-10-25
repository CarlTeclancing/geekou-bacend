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
    swychr_user_id:{type:Sequelize.STRING}
})

module.exports = User