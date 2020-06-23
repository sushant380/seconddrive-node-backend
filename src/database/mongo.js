const {MongoClient}=require('mongodb');

let database = null;

async function getMongoDB(){
    const connection = await MongoClient.connect(`mongodb://${MONGBO_DB_HOST}:27017`)
    database=connection.db('seconddrivedb');
}

async function getDatabase(){
    if(!database)
        await getMongoDB();
    return database;
}


module.exports={
    getMongoDB,
    getDatabase,
}