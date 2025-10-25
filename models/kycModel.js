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
    dob:{type:Sequelize.DATE},
    mobile:{type:Sequelize.STRING},
    mobile_code:{type:Sequelize.STRING},
    gender:{type:Sequelize.STRING},
    address:{type:Sequelize.STRING},
    street:{type:Sequelize.STRING},
    city:{type:Sequelize.STRING},
    postal_code:{type:Sequelize.STRING},
    country:{type:Sequelize.STRING},
    country_iso_code:{type:Sequelize.STRING},    

    id_proof_type:{type:Sequelize.STRING},
    id_proof_no:{type:Sequelize.STRING},
    id_proof_expiry_date:{type:Sequelize.STRING},
    id_proof_url_list:{type:Sequelize.STRING},
    livelyness_img:{type:Sequelize.STRING},

    status:{type:Sequelize.STRING ,enum:['pending' ,'failed', 'success'] ,default:'pending'},
    active:{type:Sequelize.BOOLEAN, default:false},

    fullName:{type:Sequelize.STRING},
    picture:{type:Sequelize.STRING},
    id_proof_Front:{type:Sequelize.STRING},
    id_proof_Back:{type:Sequelize.STRING},
})

module.exports = Kyc