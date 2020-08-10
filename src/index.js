const bodyParser = require('body-parser');
const swagger = require('swagger-ui-express');
const swaggerDoc = require('../swagger');
const router = require('./routes/index.js');

function setUpRoutes(app) {
  console.log('Initialisation has been completed... ');
  app.use(bodyParser.json());
  app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc));
  app.use('/api/0.1', router);
}

module.exports = {
  setUpRoutes
};
