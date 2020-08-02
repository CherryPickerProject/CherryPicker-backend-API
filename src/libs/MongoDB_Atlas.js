const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DATABASE_NAME = "CherryPickerDB";
const LIMIT = 10 // The maximum number of records that can be returned in a request
let venueCollection;
let categoriesCollection;

async function connect() {
    const url = process.env.MONGODB_CONNECTION_STRING
    await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
        if (err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
        }
        console.log('Successfully Connected to MongoDB Atlas...');
        venueCollection = client.db(DATABASE_NAME).collection("venues");
        categoriesCollection = client.db(DATABASE_NAME).collection("categories");
        const doc = await venueCollection.countDocuments();
        console.log(doc + " documents in venues collection.");
        console.log("Ready to accept requests...");
    });
}

async function getAllCategories() {
    const categories = []
    const cursor = await categoriesCollection.find({});
    await cursor.forEach(element => {
        categories.push(element);
    });
    const count = await cursor.count();
    return { totalRecords: count, data: categories };
}

// activePage: Assumed to be indexed from 1
async function getAllVenues(query, activePage) {
    const docs = [];
    const cursor = await venueCollection.find(query).limit(LIMIT).skip((activePage - 1) * LIMIT);
    await cursor.forEach(element => {
        docs.push(element);
    });
    const count = await cursor.count();
    return { totalRecords: count, data: docs };
}

async function getOneVenue(venueId) {
    const singleVenue = await venueCollection.findOne({ "_id": ObjectID(venueId) });
    return singleVenue;
}

module.exports = {
    connect,
    getAllCategories,
    getAllVenues,
    getOneVenue
}