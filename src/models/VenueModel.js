const MongoDB = require('../libs/MongoDB_Atlas');

// TODO: Currently only filering results based on tags and pax
// More filtering will be done on elasticsearch side
async function getAll(query) {
    const filteredQuery = {
        tags: { $regex: query.keyword ? query.keyword : {}, $options: "i" },
        pax: { $gte: query.pax ? parseInt(query.pax) : 0 }
    }
    return await MongoDB.getAll(filteredQuery, query.activePage);
}

module.exports = {
    getAll,
};
