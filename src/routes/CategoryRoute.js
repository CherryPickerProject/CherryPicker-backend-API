const HttpStatus = require('http-status-codes');
const CategoryModel = require("../models/CategoryModel");

async function getAll(req, res) {
    const venues = await CategoryModel.getAll();
    return res.status(HttpStatus.OK).send(venues);
}

module.exports = {
    getAll
}