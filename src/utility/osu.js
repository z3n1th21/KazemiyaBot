const { v2: osu } = require('osu-api-extended');

module.exports = {
    lookup_user: async (user, mode, type) => {
        let osu_user;
        try {
            osu_user = await osu.user.details(user, mode ?? undefined, type ?? undefined);
        } catch (error) {
            throw new Error('osu! api error');
        }
        if ('error' in osu_user) {
            throw new Error('user not found');
        } else {
            return osu_user;
        }
    },

};