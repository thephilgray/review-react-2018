const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const env = process.env.NODE_ENV || 'development';
const databaseUrl = process.env.DATABASE_URL || `mongodb://localhost:27017/mern_${env}`;

module.exports = {
  mongoose,
  databaseUrl
};
