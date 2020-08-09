const MongoDB = require('../api/MongoDB_Atlas');
const Elasticsearch = require('../api/Elasticsearch');
const esb = require('elastic-builder');

// TODO: Currently only filtering results based on tags and pax
// More filtering will be done on elasticsearch side
async function getAllFromMongoDB(query) {
    const filteredQuery = {
        tags: { $regex: query.keyword ? query.keyword : {}, $options: "i" },
        pax: { $gte: query.pax ? parseInt(query.pax) : 0 }
    }
    return await MongoDB.getAllVenues(filteredQuery, query.activePage);
}

async function getAllFromElastic(query) {
    console.log("query is")
    console.log(query)
    // Offset for elastic-builder seems to be from 1 and not 0

    // const requestBody = esb.requestBodySearch()
    //     .query(
    //         esb.boolQuery()
    //             .must(
    //                 // esb.multiMatchQuery(['tags', 'description', 'title', 'facilities'], query.keyword),
    //                 // esb.multiMatchQuery(['tags', 'description', 'title', 'facilities'], query.category),
    //                 esb.termsQuery('link', "https://www.venuerific.com/sg/venues/miska-cafe")
    //                 // from S$2500 hirefee
    //             )
    //         // .filter(
    //         //     //     // esb.simpleQueryStringQuery('tags', query.category),
    //         //     //     // esb.simpleQueryStringQuery('description', query.keyword),
    //         //     //     // esb.simpleQueryStringQuery('description', query.category),
    //         //     esb.rangeQuery('pax').gte(query.pax),
    //         //     //     // esb.rangeQuery('rating').gte(query.rating),
    //         //     // esb.rangeQuery('price.pricing').lte(parseInt(query.price)))

    //         // )
    //     ).size(30)
    //     .from(query.activePage);

    const requestBody = esb.termQuery('link', "https://www.venuerific.com/sg/venues/miska-cafe")

    return await Elasticsearch.getAllVenues(requestBody)
}

async function getOne(venueId) {
    return await MongoDB.getOneVenue(venueId);
}

module.exports = {
    getAllFromMongoDB,
    getAllFromElastic,
    getOne
};
