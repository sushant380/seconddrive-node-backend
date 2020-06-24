const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config();
const sessionConfig={
    store: new MongoStore({url:'mongodb://localhost:27017/usersessions'}),
    secret: process.env.SECONDDRIVE_SECRET_KEY,
    secure: 'auto',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 30 * 60 * 1000
    }
};

module.exports={
    sessionConfig,
}