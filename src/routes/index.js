const express = require('express');
const router = express.Router();
const VenueRoute = require("./VenueRoute");
const HealthRoute = require("./HealthRoute");

router.use('/health', HealthRoute.isLive);

router.get('/venues', VenueRoute.getAll);
router.get('/venues/:id', VenueRoute.getOne);
module.exports = router;