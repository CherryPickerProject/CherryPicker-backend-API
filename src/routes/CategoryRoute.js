const HttpStatus = require('http-status-codes');
const CategoryModel = require('../models/CategoryModel');

async function getAll(req, res) {
  const categories = await CategoryModel.getAll();
  return res.status(HttpStatus.OK).send(categories);
}

module.exports = {
  getAll
};
