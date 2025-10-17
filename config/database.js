const { Sequelize } = require('sequelize');

// Replace with your actual database credentials
const sequelize = new Sequelize('test', 'root', '', {
  host: 'localhost', // or your database host
  dialect: 'mysql', // or 'postgres', 'sqlite', etc.
  logging: false // set to console.log to see the raw SQL queries
});

module.exports = sequelize;