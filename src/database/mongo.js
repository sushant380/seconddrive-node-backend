const {MongoClient}=require('mongodb');
require('dotenv').config();

let connection = null;

async function getMongoDB(){
    if(!connection)
        connection = await MongoClient.connect(`mongodb://${ process.env.MONGO_DB_HOST}:27017`)
    return connection;
}

async function getDatabase(){
    return await getMongoDB().db('seconddrivedb');
    
}

async function getUserDatabase(){
    return await getMongoDB().db('seconddrivedb');
}


module.exports={
    getMongoDB,
    getDatabase,
    getUserDatabase,
}