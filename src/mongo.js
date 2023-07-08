const { MongoClient } = require('mongodb');
const { mongo_uri } = require('../config.json');

let _client;

module.exports = {
    client: _client,

    initialize: async () => {
        _client = new MongoClient(mongo_uri);
        _client.connect();
    },

    get_client: () => {
        return _client;
    },
};