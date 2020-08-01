const Joi = require('@hapi/joi');

const getVenues = Joi.object({
    activePage: Joi.number().required(),
    category: Joi.string().optional(),
    keyword: Joi.string().optional(),
    region: Joi.string().optional(),
    pax: Joi.number().optional(),
    rating: Joi.number().optional(),
    price: Joi.number().optional(),
});


module.exports = {
    getVenues
}