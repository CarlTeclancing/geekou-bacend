const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// A function to verify if a protected request if authenticated or not
const isAuthenticated = async(req ,res ,next)=>{
    try{
        const {authorization} = req.headers
        if(!authorization){return res.status(401).json({error:'Un-authorised'})}

        const Bearer = authorization.split(' ')[0] 
        if(Bearer.toLowerCase() != (process.env.BEARER_NAME).toLowerCase()){ return res.status(401).json({error:'Un-authorised'}) }

        const token = authorization.split(' ')[1] 
        if(!token){return res.status(401).json({error:'Un-authorised'})}

        const user = await jwt.decode(token)

        if(user){
            const exists = User.findOne({where:{email:user?.email}})
            if(exists){
                req.id = user.id
                next()
            }else{ return res.status(401).json({error:'Un-authorised'}) }
        }else{ return res.status(401).json({error:'Un-authorised'}) }
        
    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:"Server error"})
    }
}

module.exports = isAuthenticated