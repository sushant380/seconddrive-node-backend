const { getUserDatabase } = require('./mongo');

const collectionName='userdetails';

async function getUserByUserId(userid){
    await getUserDatabase().findOne({userid});
}