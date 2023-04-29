const dotenv = require('dotenv').config();
const { Sequelize } = require('sequelize');

//connect to coupid_dev if it is development env while coupid_production for production launch
if(process.env.environment == 'production'){
  const sequelize = new Sequelize(process.env.DB_NAME_DEV, process.env.DB_USER_DEV, process.env.DB_PASSWORD_DEV, {
    host: process.env.DB_HOST_DEV,
    dialect: 'postgres',
  });
}else if(process.env.environment == 'development'){
  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  });
}else if(process.env.environment == 'local'){
  const sequelize = new Sequelize(process.env.DB_NAME_LOCAL, process.env.DB_USER_LOCAL, process.env.DB_PASSWORD_LOCAL, {
    host: process.env.DB_HOST_LOCAL,
    dialect: 'postgres',
  });
}else{
  console.log('No environment defined');
}
// Test the authentication
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = sequelize;