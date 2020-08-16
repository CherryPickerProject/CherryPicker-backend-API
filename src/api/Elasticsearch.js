const elasticsearch = require('elasticsearch');
const AWS = require('aws-sdk');
const AWSConnector = require('http-aws-es');
const elasticsearchIndex = "cherrypickerdb-venues-index"; // This is the name of the index created in another cherrypicker project repository-logstash
let elasticClient;

// Need to define config outside as the elasticsearch client is not able to read it from within.
const config = AWS.config.update({
    credentials: new AWS.Credentials(process.env.ELASTIC_AWS_ACCESS_KEY, process.env.ELASTIC_AWS_SECRET_KEY),
    region: 'us-east-1' //Free AWS account hosted here
})

async function connect() {
    const elasticHost = process.env.ELASTIC_SEARCH_ENDPOINT;

    elasticClient = new elasticsearch.Client({
        connectionClass: AWSConnector,
        host: elasticHost,
        amazonES: config
    });

    elasticClient.ping({
        // ping usually has a 3000ms timeout
        requestTimeout: 4000
    }, function (error) {
        if (error) {
            console.log(error)
            console.log('Elasticsearch cluster is down!');
            // TODO: Throw an error to return back and execute Mongodb query
        } else {
            console.log('Elasticsearch cluster is running...');
        }
    });
}

async function getAllVenues(requestBody) {
    if (elasticClient == undefined) {
        await connect();
    }
    const results = await elasticClient.search({ index: elasticsearchIndex, body: requestBody.toJSON() })
    const resultsHits = results.hits

    // DEBUG: currently has an issue :(
    // https://github.com/elastic/logstash/issues/12180
    const formattedData = resultsHits.hits.map((eachItem) => {
        let data = {
            "_id": eachItem._source.mongo_id,
            "ratings": eachItem._source.ratings, //TODO: Remove Ratings from returned results...might not want to consider this field anymore
            "link": eachItem._source.link,
            "images": eachItem._source.images,
            "title": eachItem._source.title,
            "location": eachItem._source.location,
            "tags": eachItem._source.tags,
            "price": eachItem._source.price,
            "pax": eachItem._source.pax,
            "description": eachItem._source.description,
            "facilities": eachItem._source.facilities,
            "promos": eachItem._source.promos,
        }

        return data
    })

    return { totalRecords: resultsHits.total.value, data: formattedData };
}

module.exports = {
    connect,
    getAllVenues
}