require('dotenv').config();
const mysql = require('mysql2');

const connectDB = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});


try {
    connectDB.connect((err)=>{
        if(err) throw err;
        console.log('connection to mysql database');
    });
    
} catch (err) {
    console.log("error ohhhhhhhhhhhhhhhhhhhhhhh");
}




module.exports = connectDB;