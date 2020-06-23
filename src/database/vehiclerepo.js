const { getDatabase } = require('./mongo');

const collectionName = 'warehouses';

async function getAllVehicles() {
    const pipeline = [
        {
            '$unwind': '$cars'
        },
        {
            '$unwind': '$cars.vehicles'
        },
        {
            '$project': {
                '_id': '$cars.vehicles._id',
                'make': '$cars.vehicles.make',
                'model': '$cars.vehicles.model',
                'year': '$cars.vehicles.year_model',
                'price': '$cars.vehicles.price',
                'licensed': '$cars.vehicles.licensed',
                'dateAdded': '$cars.vehicles.date_added',
                'warehouse': '$name',
                'location': '$cars.location',
                'latitude': '$location.lat',
                'longitude': '$location.long'
            }
        }, {
            '$sort': {
                'date_added': -1
            }
        }
    ];
    const database = await getDatabase();
    return await database.collection(collectionName).aggregate(pipeline).toArray();
}

async function getVehicleById(id) {
    const pipeline = [
        {
           '$unwind':'$cars'
        },
        {
           '$unwind':'$cars.vehicles'
        },
        {
           '$match':{
              'cars.vehicles._id':parseInt(id)
           }
        },
        {
           '$project':{
              '_id':'$cars.vehicles._id',
              'make':'$cars.vehicles.make',
              'model':'$cars.vehicles.model',
              'year':'$cars.vehicles.year_model',
              'price':'$cars.vehicles.price',
              'licensed':'$cars.vehicles.licensed',
              'dateAdded':'$cars.vehicles.date_added',
              'warehouse':'$name',
              'location':'$cars.location',
              'latitude':'$location.lat',
              'longitude':'$location.long'
           }
        }
     ];
     console.log(pipeline);
    const database = await getDatabase();
    return await database.collection(collectionName).aggregate(pipeline).toArray();
}

async function search(q) {
    var query=`.*${q}.*`;
    const pipeline = [
        {
           '$unwind':'$cars'
        },
        {
           '$unwind':'$cars.vehicles'
        },
        {
           '$addFields':{
              'yearString':{
                 '$toString':'cars.vehicles.year'
              }
           }
        },
        {
           '$match':{
              '$or':[
                 {
                    'cars.vehicles.model':{
                       '$regex':query
                    }
                 },
                 {
                    'cars.vehicles.make':{
                       '$regex':query
                    }
                 },
                 {
                    'yearString':{
                       '$regex':query
                    }
                 }
              ]
           }
        },
        {
           '$project':{
              '_id':'$cars.vehicles._id',
              'make':'$cars.vehicles.make',
              'model':'$cars.vehicles.model',
              'year':'$cars.vehicles.year_model',
              'price':'$cars.vehicles.price',
              'licensed':'$cars.vehicles.licensed',
              'dateAdded':'$cars.vehicles.date_added',
              'warehouse':'$name',
              'location':'$cars.location',
              'latitude':'$location.lat',
              'longitude':'$location.long'
           }
        },
        {
           '$sort':{
              'date_added':-1
           }
        }
     ];
     console.log(JSON.stringify(pipeline));
    const database = await getDatabase();
    return await database.collection(collectionName).aggregate(pipeline).toArray();
}

module.exports={
    getAllVehicles,
    getVehicleById,
    search,
}