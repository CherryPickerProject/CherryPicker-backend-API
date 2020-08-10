require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const index = require('./index');
const app = express();

function init() {
  console.log(`CherryPicker API is starting initialisation...`);

  index.setUpRoutes(app);
}

const PORT = 9000;
app.listen(PORT, init());

module.exports.handler = serverless(app);
