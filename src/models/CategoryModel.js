const MongoDB = require('../api/MongoDB_Atlas');

async function getAll() {
  return await MongoDB.getAllCategories();
}
module.exports = {
  getAll
};
