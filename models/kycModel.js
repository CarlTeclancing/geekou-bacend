const sequelize = require('../db')
const Sequelize = require('sequelize')
const User = require('./userModel')

// table name:Profile
const Kyc = sequelize.define('profiles' ,{
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
    status:{type:Sequelize.STRING ,enum:['pending' ,'failed', 'success'] ,default:'pending'},
    verified:{type:Sequelize.BOOLEAN, default:false},

    fullName:{type:Sequelize.STRING},
    dob:{type:Sequelize.DATE},
    location:{type:Sequelize.STRING},
    idNumber:{type:Sequelize.STRING},
    phoneNumber:{type:Sequelize.STRING},
    // files
    idCardFront:{type:Sequelize.STRING},
    idCardBack:{type:Sequelize.STRING},
    niu:{type:Sequelize.STRING},
})

module.exports = Kyc