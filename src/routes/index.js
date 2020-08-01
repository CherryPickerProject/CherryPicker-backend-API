const express = require('express');
const router = express.Router();
const VenueRoute = require("./VenueRoute")

router.get('/venues', VenueRoute.getAll);
module.exports = router;