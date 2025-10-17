const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
// const userSchema = require("../schemas/userSchema");
const User = require('../models/userModel')
const bcrypt = require("bcryptjs");
// const {
//   createTable,
//   checkRecordExists,
//   insertRecord,
// } = require("../utils/sqlFunctions");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// const register = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     res
//       .status(400)
//       .json({ error: "Email or Password fields cannot be empty!" });
//     return;
//   }
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);
//   const user = {
//     userId: uuidv4(),
//     email,
//     password: hashedPassword,
//   };
//   try {
//     await createTable(userSchema);
//     const userAlreadyExists = await checkRecordExists("users", "email", email);
//     if (userAlreadyExists) {
//       res.status(409).json({ error: "Email already exists" });
//     } else {
//       await insertRecord("users", user);
//       res.status(201).json({ message: "User created successfully!" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

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
            return res.status(200).json({user:tmp})
        }

    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:'Server error'})
    }
}

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     res
//       .status(400)
//       .json({ error: "Email or Password fields cannot be empty!" });
//     return;
//   }

//   try {
//     const existingUser = await checkRecordExists("users", "email", email);

//     if (existingUser) {
//       if (!existingUser.password) {
//         res.status(401).json({ error: "Invalid credentials" });
//         return;
//       }

//       const passwordMatch = await bcrypt.compare(
//         password,
//         existingUser.password
//       );

//       if (passwordMatch) {
//         res.status(200).json({
//           userId: existingUser.userId,
//           email: existingUser.email,
//           access_token: generateAccessToken(existingUser.userId),
//         });
//       } else {
//         res.status(401).json({ error: "Invalid credentials" });
//       }
//     } else {
//       res.status(401).json({ error: "Invalid credentials" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

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
                tmp.token = token;
                await tmp.save()
                const data = user
                delete data.password
                return res.status(200).json({user:data})
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