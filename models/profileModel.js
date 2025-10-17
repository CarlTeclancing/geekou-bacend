const sequelize = require('../db')
const Sequelize = require('sequelize')
const User = require('./userModel')

const Profile = sequelize.define('profiles' ,{
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

    fullName:{type:Sequelize.STRING},
    dob:{type:Sequelize.DATE},
    location:{type:Sequelize.STRING},
    idNumber:{type:Sequelize.STRING},
    phoneNumber:{type:Sequelize.STRING},
    idCardFront:{type:Sequelize.STRING},
    idCardBack:{type:Sequelize.STRING},
    niu:{type:Sequelize.STRING},
})

module.exports = Profile