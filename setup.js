const dotenv = require('dotenv');
dotenv.config();
const env = process.env.NODE_ENV || 'dev'
const config = require('./config');

module.exports = {
    "server_host": config[`${env}`]['server_host'],
    "server_port": config[`${env}`]['server_port'],
    "duration": config[`${env}`]['duration']
};