const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel')
const bcrypt = require("bcryptjs");


const register =async(req ,res)=>{
    try{
      console.log(req.body);
      // retrun
        const {email ,name ,password ,confirm} = req.body
        if(!email || !name || !password || !confirm){return res.status(401).json({error:'Fill the required fields'})}
        if(password != confirm){return res.status(401).json({error:'Passwords not identical'})}
        
        const exists = await User.findOne({where:{email:email}}) 
        if(exists){return res.status(401).json({error:'Email already in use'})}
        else{
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password ,salt)
            
            const tmp = await User.create({email:email ,name:name,password:hash})
            tmp.password = undefined
            return res.status(200).json({user:tmp})
        }

    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:'Server error'})
    }
}

const login =async(req ,res)=>{
    try{
        const {email ,password} = req.body
        if(!email || !password){return res.status(401).json({error:'Fill the required fields'})}
        const tmp = (await User.findOne({where:{email:email}})) 
        // return
        console.log(tmp);
        
        if(tmp){
            const user = tmp.dataValues
            console.log("comapring" ,password ,user.password);
             
            if(await bcrypt.compare(password ,user.password)){
                console.log("there are equal");
                
                const token = await jwt.sign(user ,process.env.SECRET_TOKEN_KEY)
                // tmp.token = token;
                // await tmp.save()
                const data = user
                delete data.password
                delete data.token
                delete data.swychr_user_id
                return res.status(200).json({ access_token:token,user:data})
            }else{
                return res.status(401).json({error:'Invalid email or password'})
            } 
        }
        else{return res.status(401).json({error:'No existing email'})}
    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:'Server error'})
    }
}

module.exports = {
  register,
  login,
};