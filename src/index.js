const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const basicAuth = require('express-basic-auth')


const {getAllVehicles,
    getVehicleById,
    search}= require('./database/vehiclerepo');

const app=express();

app.use(helmet());

app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));

 
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

app.listen('8080',()=>{
    console.log('Listing to port 8080');
});