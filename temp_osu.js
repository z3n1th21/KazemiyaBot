const { osu_client_id, osu_client_secret } = require('./config.json');
const { auth, v2 } = require('osu-api-extended');

const main = async () => {
    await auth.login(osu_client_id, osu_client_secret, ['public']);
    const user = await v2.user.details('kazemiya');
    console.log(user.username);
    process.exit();
};

main();
