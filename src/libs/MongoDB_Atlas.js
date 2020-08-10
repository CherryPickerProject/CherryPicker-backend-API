const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DATABASE_NAME = 'CherryPickerDB';
const LIMIT = 10; // The maximum number of records that can be returned in a request
let venueCollection;
let categoriesCollection;
let cachedDb = null;

// The reason why we do a connect() each time a request is sent is because the original code
// of making one connection to db at index.js does not work on aws lambda even though it works locally.
// Previously, lambda did not return from the connect() function and hence venueCollection and categoriesCollection
// were always undefined. It could be due to some async, await concepts that we misunderstood.
// TODO: Explore in the future
function connect() {
  const url = process.env.MONGODB_CONNECTION_STRING;
  console.log('Connecting to mongodb atlas...');

  if (cachedDb) {
    console.log('Using cached database instance...');
    venueCollection = cachedDb.db(DATABASE_NAME).collection('venues');
    categoriesCollection = cachedDb.db(DATABASE_NAME).collection('categories');
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(async (db) => {
      console.log('Successful connection...');
      cachedDb = db;
      venueCollection = cachedDb.db(DATABASE_NAME).collection('venues');
      categoriesCollection = cachedDb
        .db(DATABASE_NAME)
        .collection('categories');
      return cachedDb;
    })
    .catch((err) => {
      console.log('Connection error occurred: ', err);
      callback(err);
    });
}

async function getAllCategories() {
  if (categoriesCollection == undefined) {
    await connect();
  }
  const categories = [];
  const cursor = await categoriesCollection.find({});
  await cursor.forEach((element) => {
    categories.push(element);
  });
  const count = await cursor.count();

  return { totalRecords: count, data: categories };
}

// activePage: Assumed to be indexed from 1
async function getAllVenues(query, activePage) {
  if (venueCollection == undefined) {
    await connect();
  }
  const docs = [];
  const cursor = await venueCollection
    .find(query)
    .limit(LIMIT)
    .skip((activePage - 1) * LIMIT);
  await cursor.forEach((element) => {
    docs.push(element);
  });
  const count = await cursor.count();
  return { totalRecords: count, data: docs };
}

async function getOneVenue(venueId) {
  if (venueCollection == undefined) {
    await connect();
  }
  const singleVenue = await venueCollection.findOne({ _id: ObjectID(venueId) });
  return singleVenue;
}

module.exports = {
  getAllCategories,
  getAllVenues,
  getOneVenue
};
