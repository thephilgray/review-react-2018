const mongoose = require('mongoose');
// require('dotenv').config(); // uncomment to use mlab db

mongoose.Promise = global.Promise;

const env = process.env.NODE_ENV || 'development';
const databaseUrl = process.env.DATABASE_URL || `mongodb://localhost/mern_${env}`;

module.exports = {
  mongoose,
  databaseUrl
};
