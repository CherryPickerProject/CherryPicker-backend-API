const elasticsearch = require('elasticsearch');
let elasticClient;
const elasticsearchIndex = "cherrypickerdb" // This is the default index created by mongo-connector in another repository

async function connect() {
    const elasticHost = process.env.ELASTIC_SEARCH_ENDPOINT;
    const password = process.env.ELASTIC_SEARCH_PASSWORD;
    const username = process.env.ELASTIC_SEARCH_USERNAME;

    elasticClient = new elasticsearch.Client({
        host: elasticHost,
        httpAuth: `${username}:${password}`
    });

    elasticClient.ping({
        // ping usually has a 3000ms timeout
        requestTimeout: 1000
    }, function (error) {
        if (error) {
            console.log(error)
            console.log('Elasticsearch cluster is down!');
        } else {
            console.log('Elasticsearch cluster is running...');
        }
    });
}

async function getAllVenues(requestBody) {
    const results = await elasticClient.search({ index: elasticsearchIndex, body: requestBody.toJSON() })
    const resultsHits = results.hits

    const formattedData = resultsHits.hits.map((eachItem) => {
        let data = eachItem._source
        data._id = eachItem._id // TODO: Update to read from mongoID
        return data
    })

    console.log(resultsHits)
    return { totalRecords: resultsHits.total.value, data: formattedData };
}

module.exports = {
    connect,
    getAllVenues
}