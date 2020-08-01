const MongoClient = require('mongodb').MongoClient;
const DATABASE_NAME = "CherryPickerDB";
const LIMIT = 10 // The maximum number of records that can be returned in a request
let collection;

async function connect() {
    const url = process.env.MONGODB_CONNECTION_STRING
    await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
        if (err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
        }
        console.log('Successfully Connected to MongoDB Atlas...');
        collection = client.db(DATABASE_NAME).collection("venues");
        const doc = await collection.countDocuments();
        console.log(doc + " documents in collection.");
        console.log("Ready to accept requests.")
    });
}

// activePage: Assumed to be indexed from 1
async function getAll(query, activePage) {
    const docs = []
    const cursor = await collection.find(query).limit(LIMIT).skip((activePage - 1) * LIMIT)
    await cursor.forEach(element => {
        docs.push(element)
    });
    const count = await cursor.count()
    return { totalRecords: count, data: docs };
}

module.exports = {
    connect,
    getAll
}