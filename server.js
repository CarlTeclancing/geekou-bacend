const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const path = require('path')
const {cwd} = require('process')
const sequelize = require('./db');
const morgan = require("morgan");


const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Log every request
app.use(morgan("dev"));

app.use("/file", express.static( path.join( cwd(), 'uploads' )))

const isAuthenticated = require("./middleware/isAuthenticated");
const authRoutes = require("./routes/authRoutes");
const kycRoutes = require('./routes/kycRoutes')
const cardRoutes = require('./routes/cardsRoutes');
const transactionRoutes = require('./routes/transactionRoutes')

app.use("/api/auth", authRoutes);
app.use("/api/kyc",  isAuthenticated,kycRoutes);
app.use("/api/card" ,isAuthenticated ,cardRoutes)
app.use("/api/transaction" ,isAuthenticated ,transactionRoutes)


async function initializeAndStartServer() {
  try {
    // 1. Connection Check
    await sequelize.authenticate();
    console.log('Database connection successful.');

    // 2. Table Synchronization (The long-running task)
    await sequelize.sync({alter:true});
    // await sequelize.sync(); 
    console.log('🛠️ Database tables synced.');
    

    // 3. START THE SERVER ONLY NOW
    // The server is only available once the database is 100% ready.
    app.listen(PORT, () => {
        console.log(` Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Critical startup failure:', error.message);
    // If the DB fails, there's no point running the app.
    process.exit(1); 
  }
}

initializeAndStartServer(); 
