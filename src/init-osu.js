const { osu_client_id, osu_client_secret } = require('../config.json');
const { auth } = require('osu-api-extended');

const main = async () => {
    await auth.login(osu_client_id, osu_client_secret, ['public']);
};

main();
