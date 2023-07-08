const { initialize, get_client } = require('./src/mongo.js');

const main = () => {
    initialize();
    const client = get_client();
    const db = client.db('user');
    const settings = db.collection('settings');
    console.log(settings);
    client.close();
    process.exit();
};

main();