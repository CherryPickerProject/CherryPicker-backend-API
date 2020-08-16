const express = require('express');
const router = express.Router();
const VenueRoute = require('./VenueRoute');
const HealthRoute = require('./HealthRoute');
const CategoryRoute = require('./CategoryRoute');

router.use('/health', HealthRoute.isLive);

router.get('/venues', VenueRoute.getAll);
router.get('/venues/:id', VenueRoute.getOne);

router.get('/categories', CategoryRoute.getAll);
module.exports = router;
