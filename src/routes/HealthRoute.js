const HttpStatus = require('http-status-codes');

async function isLive(req, res) {
    res.sendStatus(HttpStatus.OK);
}

module.exports = {
    isLive
}