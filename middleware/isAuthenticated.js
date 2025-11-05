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
        // console.log("the decoded token", user);
        

        if(user){
            const exists = await User.findOne({where:{email:user?.email}})
            // console.log("the user in the middleware", exists);
            
            if(exists && user && user.id && exists.id == user.id){
                req.user = user.id
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