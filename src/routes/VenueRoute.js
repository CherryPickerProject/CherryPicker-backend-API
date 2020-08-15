const HttpStatus = require('http-status-codes');
const VenueModel = require('../models/VenueModel');
const VenueSchema = require('../validations/VenueSchema');

async function getAll(req, res) {
  if (VenueSchema.getVenues.validate(req.query, { stripUnknown: true }).error) {
    return res.status(HttpStatus.BAD_REQUEST).send('Bad Request');
  }
  const venues = await VenueModel.getAll(req.query);
  return res.status(HttpStatus.OK).send(venues);
}

async function getOne(req, res) {
  if (
    VenueSchema.getOneVenue.validate(req.params.id, { stripUnknown: true })
      .error
  ) {
    return res.status(HttpStatus.BAD_REQUEST).send('Bad Request');
  }
  const venues = await VenueModel.getOne(req.params.id);
  return res.status(HttpStatus.OK).send(venues);
}

module.exports = {
  getAll,
  getOne
};
