const HttpStatus = require('http-status-codes');
const VenueModel = require("../models/VenueModel");
const VenueSchema = require("../validations/VenueSchema")

async function getAll(req, res, next) {
    if (VenueSchema.getVenues.validate(req.query, { stripUnknown: true }).error) {
        return res.status(HttpStatus.BAD_REQUEST).send("Bad Request");
    }
    const venues = await VenueModel.getAll(req.query);
    return res.status(HttpStatus.OK).send(venues);
}

module.exports = {
    getAll
}