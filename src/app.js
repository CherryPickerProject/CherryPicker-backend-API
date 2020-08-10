const express = require('express');
const MongoDB = require('./libs/MongoDB_Atlas');
const serverless = require('serverless-http');
const index = require('./index');
const app = express();
require('dotenv').config();

async function init() {
  console.log(`CherryPicker API is starting initialisation...`);

  await MongoDB.connect();
}

const PORT = 9000;
app.listen(PORT, init(), index.setUpRoutes(app));

module.exports.handler = serverless(app);
