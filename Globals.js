const DEV = require('./DEV.js');
module.exports = {
    BASE_URL: 'http://' + DEV.SERVER_IP + ':' + DEV.SERVER_PORT,
    WEB_BASE_URL: 'http://ec2-54-186-191-46.us-west-2.compute.amazonaws.com:3000',
};
