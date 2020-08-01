const bodyParser = require('body-parser');
const express = require('express');
const swagger = require('swagger-ui-express');
const swaggerDoc = require('../swagger');
const router = require('./routes/index.js');
const MongoDB = require("./libs/MongoDB_Atlas");
require('dotenv').config();

const app = express();
const PORT = 9000;

app.use(bodyParser.json());
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc));
app.use('/api/0.1', router);

app.listen(PORT, init);

async function init() {
    console.log(`CherryPicker API is listening at http://localhost:${PORT}`);

    await MongoDB.connect();
}