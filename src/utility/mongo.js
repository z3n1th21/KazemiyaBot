const { MongoClient } = require('mongodb');
const { mongo_uri } = require('../../config.json');

let _client;

module.exports = {
    client: _client,
    initialize: async () => {
        _client = new MongoClient(mongo_uri);
        _client.connect();
    },
    disconnect: () => {
        _client.close();
    },
    get_client: () => {
        return _client;
    },
    get_user: async (id) => {
        const users = _client.db('users').collection('settings');
        const result = users.findOne(
            { _id: id },
            {
                osu_id: true,
            },
        );
        if (!result) {
            throw new Error('no user in database');
        }
        return result;
    },
};
