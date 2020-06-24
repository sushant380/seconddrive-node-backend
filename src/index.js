const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const basicAuth = require('express-basic-auth')
const session = require('express-session');
const {sessionConfig}=require('./config/sessionConfig');
const cookieParser=require('cookie-parser');
const flash=require('connect-flash');
require('dotenv').config();

const passport = require('passport');

const {getAllVehicles,
    getVehicleById,
    search}= require('./database/vehiclerepo');

const app=express();

app.use(helmet());

app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));

app.use(cookieParser(process.env.SECONDDRIVE_SECRET_KEY));

app.use(session(sessionConfig))

app.use(flash());



app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.session = req.session;
  next();
});


 
app.use(basicAuth({
    users: { 'admin': 'admin' }
}))

app.get('/cars', async (req,res)=>{
    const result=await getAllVehicles();
    res.send({
        'vehicles':result,
        'total':result.length,
    });
})

app.get('/cars/:id', async (req,res)=>{
    if(req.params.id==='search'){
        const result=await search(req.query.q);
        res.send({
            'vehicles':result,
            'total':result.length,
        });
    }else{
        const result=await getVehicleById(req.params.id);
        res.send(result[0]);
    }
})

app.listen('3010',()=>{
    console.log('Listing to port 3010');
});