const bodyParser = require('body-parser');
const express = require('express');
const swagger = require('swagger-ui-express');
const PORT = 9000;
const swaggerDoc = require('../swagger');

const router = require('./routes/index.js');

const app = express();

app.use(bodyParser.json());
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc));
app.use('/api/0.1', router);

app.listen(PORT, () => console.log(`CherryPicker API is listening at http://localhost:${PORT}`))