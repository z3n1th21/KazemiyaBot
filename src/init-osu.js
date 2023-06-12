const { osu_client_id, osu_client_secret } = require('../config.json');
const { v2, auth } = require('osu-api-extended');

const main = async () => {
    await auth.login(osu_client_id, osu_client_secret, ['public']);

    const v2_assets_seasonalBackgrounds = await v2.assets.seasonalBackgrounds();
    console.log(v2_assets_seasonalBackgrounds);
};

main();
