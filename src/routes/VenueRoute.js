const HttpStatus = require('http-status-codes');
const VenueModel = require("../models/VenueModel");
const VenueSchema = require("../validations/VenueSchema")

async function getAll(req, res) {
    if (VenueSchema.getVenues.validate(req.query, { stripUnknown: true }).error) {
        return res.status(HttpStatus.BAD_REQUEST).send("Bad Request");
    }

    // Hits Elasticsearch for result by default.
    // Otherwise, will redirect it to hit MongoDB Atlas
    try {
        const resultsFromElastic = await VenueModel.getAllFromElastic(req.query);
        return res.status(HttpStatus.OK).send(resultsFromElastic);
    } catch (error) {
        console.log(error)
        console.log("Failed to receive search results from Elastic-Search, going to query MongoDB instead.");
        const resultsFromMongoDB = await VenueModel.getAllFromMongoDB(req.query);
        return res.status(HttpStatus.OK).send(resultsFromMongoDB);
    }
}

async function getOne(req, res) {
    if (VenueSchema.getOneVenue.validate(req.params.id, { stripUnknown: true }).error) {
        return res.status(HttpStatus.BAD_REQUEST).send("Bad Request");
    }
    const venues = await VenueModel.getOne(req.params.id);
    return res.status(HttpStatus.OK).send(venues);
}

module.exports = {
    getAll,
    getOne
}