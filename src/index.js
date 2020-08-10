const bodyParser = require('body-parser');
const swagger = require('swagger-ui-express');
const swaggerDoc = require('../swagger');
const router = require('./routes/index.js');
var cors = require('cors');

function setUpRoutes(app) {
  console.log('Initialisation has been completed... ');
  app.use(bodyParser.json());
  app.use(cors({ credentials: true, origin: true }));
  app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc));
  app.use('/api/0.1', router);
}

module.exports = {
  setUpRoutes
};
