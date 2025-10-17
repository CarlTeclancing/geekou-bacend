const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
// const sequelize = require('./config/database');
const sequelize = require('./db');

// const connectDB = require("./db/db");



// async function connectDB() {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
// connectDB();


const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require('./routes/profileRoutes')

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);



async function initializeAndStartServer() {
  try {
    // 1. Connection Check
    await sequelize.authenticate();
    console.log('✅ Database connection successful.');

    // 2. Table Synchronization (The long-running task)
    await sequelize.sync({alter:true}); 
    console.log('🛠️ Database tables synced.');
    

    // 3. START THE SERVER ONLY NOW
    // The server is only available once the database is 100% ready.
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Critical startup failure:', error.message);
    // If the DB fails, there's no point running the app.
    process.exit(1); 
  }
}

initializeAndStartServer(); 
// connectDB();

// app.listen(PORT, () => {
//   console.log(`Server running on port: ${PORT}`);
// });
